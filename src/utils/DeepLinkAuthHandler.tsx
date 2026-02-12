import React, { useEffect, useRef, useCallback } from 'react';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useVerifyLoginLinkMutation } from '../redux/features/auth';

function getQueryParam(url: string, key: string): string | null {
  const qIndex = url.indexOf('?');
  if (qIndex === -1) return null;

  const query = url.slice(qIndex + 1);
  const pairs = query.split('&');

  for (const p of pairs) {
    if (!p) continue;
    const [kRaw, vRaw = ''] = p.split('=');
    const k = decodeURIComponent(kRaw || '').trim();
    if (k !== key) continue;

    const v = decodeURIComponent(vRaw || '').trim();
    return v.length > 0 ? v : null;
  }

  return null;
}

function extractTokenFromUrl(url: string | null): string | null {
  if (!url) return null;

  const lower = url.toLowerCase();
  const isAuthLink =
    lower.startsWith('feedbackapp://auth') ||
    lower.startsWith('feedbackapp:///auth');

  if (!isAuthLink) return null;

  return getQueryParam(url, 'token');
}

function getErrorCode(e: any): string {
  // ✅ matches httpx.WriteError -> { "error": "<code>" }
  return e?.data?.error ?? 'internal_error';
}

type Props = {
  onAuthLinkError?: (payload: { code: string; message: string }) => void;
  onProcessingChange?: (processing: boolean) => void;
  onAuthLinkSuccess?: () => void;
};

export const DeepLinkAuthHandler: React.FC<Props> = ({
  onAuthLinkError,
  onProcessingChange,
  onAuthLinkSuccess,
}) => {
  const accessToken = useSelector((s: RootState) => s.auth.accessToken);
  const [verifyLoginLink] = useVerifyLoginLinkMutation();

  // Latest values for stable subscription
  const accessTokenRef = useRef<string | null>(null);
  const verifyRef = useRef(verifyLoginLink);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    verifyRef.current = verifyLoginLink;
  }, [verifyLoginLink]);

  // Prevent repeating the same token (fixes your repeated 401 requests)
  const lastTokenRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);

  const handleUrl = useCallback(
    async (url: string | null) => {
      if (!url) return;
      if (accessTokenRef.current) return;

      const token = extractTokenFromUrl(url);
      if (!token) return;

      // Dedupe: process each token only once automatically
      if (lastTokenRef.current === token) return;
      lastTokenRef.current = token;

      if (inFlightRef.current) return;
      inFlightRef.current = true;

      onProcessingChange?.(true);

      try {
        await verifyRef.current({ token }).unwrap();
        onAuthLinkSuccess?.();
      } catch (e: any) {
        const code = getErrorCode(e);
        const message =
          code === 'invalid_or_expired_token'
            ? 'This login link is invalid or expired. Please request a new link.'
            : code; // show server code

        onAuthLinkError?.({ code, message });
      } finally {
        inFlightRef.current = false;
        onProcessingChange?.(false);
      }
    },
    [onAuthLinkError, onProcessingChange, onAuthLinkSuccess],
  );

  // Subscribe once
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    Linking.getInitialURL()
      .then(handleUrl)
      .catch(() => {});
    const sub = Linking.addEventListener('url', event => handleUrl(event.url));
    return () => sub.remove();
  }, [handleUrl]);

  return null;
};

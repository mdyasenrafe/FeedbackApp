import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

import { MainNavigation } from './MainNavigation';
import { OnboardingNavigation } from './OnboardingNavigation';

import { DeepLinkAuthHandler } from '../utils/DeepLinkAuthHandler';
import { Box, Text } from '../components/atom';
import { Button } from '../components/atom/Button';

import {
  setAuthFromStorage,
  setHydrated,
} from '../redux/features/auth/auth.slice';
import { readAuthFromStorage } from '../redux/features/auth';

type LinkUIState =
  | { state: 'idle' }
  | { state: 'processing' }
  | { state: 'error'; message: string; code?: string };

export function AppNavigation() {
  const dispatch = useDispatch();
  const accessToken = useSelector((s: RootState) => s.auth.accessToken);
  const hydrated = useSelector((s: RootState) => s.auth.hydrated);

  const [linkUI, setLinkUI] = useState<LinkUIState>({ state: 'idle' });
  const isProcessing = linkUI.state === 'processing';
  const isError = linkUI.state === 'error';

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await readAuthFromStorage();
        if (cancelled) return;
        dispatch(setAuthFromStorage(stored));
      } catch {
        if (cancelled) return;
        dispatch(setHydrated(true));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // close overlay when authed
  useEffect(() => {
    if (accessToken) setLinkUI({ state: 'idle' });
  }, [accessToken]);

  // ✅ don't render stacks until boot finished
  if (!hydrated) {
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="white"
      >
        <ActivityIndicator />
        <Text variant="p3" marginTop="lg">
          Loading…
        </Text>
      </Box>
    );
  }

  return (
    <>
      <DeepLinkAuthHandler
        onProcessingChange={p => {
          if (p) setLinkUI({ state: 'processing' });
        }}
        onAuthLinkError={({ code, message }) => {
          setLinkUI({ state: 'error', code, message });
        }}
        onAuthLinkSuccess={() => {
          setLinkUI({ state: 'idle' });
        }}
      />

      {accessToken ? <MainNavigation /> : <OnboardingNavigation />}

      <Modal visible={isProcessing} transparent animationType="fade">
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
          <Box
            backgroundColor="white"
            padding="xl"
            borderRadius="xl"
            alignItems="center"
            style={{ minWidth: 260 }}
          >
            <ActivityIndicator />
            <Text variant="p3" marginTop="lg">
              Signing you in…
            </Text>
          </Box>
        </Box>
      </Modal>

      <Modal visible={isError} transparent animationType="fade">
        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          padding="xl"
          style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
        >
          <Box
            backgroundColor="white"
            padding="xl"
            borderRadius="xl"
            style={{ width: '100%', maxWidth: 380 }}
          >
            <Text variant="h5">Login failed</Text>

            <Text variant="p3" marginTop="md">
              {linkUI.state === 'error' ? linkUI.message : ''}
            </Text>

            <Box marginTop="xl">
              <Button
                label="OK"
                backgroundColor="black"
                paddingVertical="lg"
                borderRadius="xl"
                onPress={() => setLinkUI({ state: 'idle' })}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

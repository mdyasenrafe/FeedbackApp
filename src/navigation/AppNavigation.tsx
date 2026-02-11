import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

import { MainNavigation } from './MainNavigation';
import { OnboardingNavigation } from './OnboardingNavigation';

import { DeepLinkAuthHandler } from '../utils/DeepLinkAuthHandler';
import { Box, Text } from '../components/atom';
import { Button } from '../components/atom/Button';

type LinkUIState =
  | { state: 'idle' }
  | { state: 'processing' }
  | { state: 'error'; message: string; code?: string };

export function AppNavigation() {
  const [linkUI, setLinkUI] = useState<LinkUIState>({ state: 'idle' });

  const accessToken = useSelector((s: RootState) => s.auth.accessToken);

  const isProcessing = linkUI.state === 'processing';
  const isError = linkUI.state === 'error';

  // If auth becomes valid, make sure overlays close
  useEffect(() => {
    if (accessToken) {
      setLinkUI({ state: 'idle' });
    }
  }, [accessToken]);

  return (
    <>
      <DeepLinkAuthHandler
        onProcessingChange={p => {
          if (p) setLinkUI({ state: 'processing' });
          // when processing ends, do NOT set idle here
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

      {/* Error dialog */}
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

            {/* optional debug code */}
            {linkUI.state === 'error' && linkUI.code ? (
              <Text variant="p4" marginTop="sm" color="grey">
                Error: {linkUI.code}
              </Text>
            ) : null}

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

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppThemeProvider } from './src/theme';
import { AppNavigation } from './src/navigation/AppNavigation';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DeepLinkAuthHandler } from './src/utils/DeepLinkAuthHandler';
import { useSelector } from 'react-redux';
import type { RootState } from './src/redux/store';
import { Box, Text } from './src/components/atom';
import { Button } from './src/components/atom/Button';

type LinkUIState =
  | { state: 'idle' }
  | { state: 'processing' }
  | { state: 'error'; message: string; code?: string };

function Root() {
  const [linkUI, setLinkUI] = useState<LinkUIState>({ state: 'idle' });
  const accessToken = useSelector((s: RootState) => s.auth.accessToken);

  const isProcessing = linkUI.state === 'processing';
  const isError = linkUI.state === 'error';

  // If auth becomes valid, ensure overlays are closed (extra safety)
  useEffect(() => {
    if (accessToken) {
      setLinkUI({ state: 'idle' });
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <StatusBar />

      <DeepLinkAuthHandler
        onProcessingChange={p => {
          setLinkUI(prev => {
            if (p) return { state: 'processing' };
            return prev.state === 'error' ? prev : { state: 'idle' };
          });
        }}
        onAuthLinkError={({ code, message }) => {
          setLinkUI({ state: 'error', code, message });
        }}
        onAuthLinkSuccess={() => {
          setLinkUI({ state: 'idle' });
        }}
      />

      <AppNavigation />

      {/* Blocking overlay during verification */}
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
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <AppThemeProvider>
            <Root />
          </AppThemeProvider>
        </SafeAreaProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  );
}

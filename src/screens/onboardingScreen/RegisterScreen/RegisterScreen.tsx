import React, { useMemo, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { Screen, Box, Text, InputBox } from '../../../components/atom';
import { Button } from '../../../components/atom/Button';
import { isValidEmail, normalizedEmail } from '../../../utils';
import { useRequestLoginLinkMutation } from '../../../redux/features/auth';

export type TRegisterStatus = 'idle' | 'sending' | 'sent' | 'error';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const [status, setStatus] = useState<TRegisterStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [requestLoginLink] = useRequestLoginLinkMutation();

  const emailFieldError = useMemo(() => {
    if (!didSubmit) return undefined;
    if (!isValidEmail(normalizedEmail(email))) return 'Invalid email';
    return undefined;
  }, [didSubmit, email]);

  const canSubmit = useMemo(() => {
    return isValidEmail(normalizedEmail(email)) && status !== 'sending';
  }, [email, status]);

  const openMailApp = async (cleanEmail: string) => {
    const url = Platform.OS === 'ios' ? 'message://' : `mailto:${cleanEmail}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert(
          'No mail app found',
          'Please open your email app manually.',
        );
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Could not open mail',
        'Please open your email app manually.',
      );
    }
  };

  const onSendLink = async () => {
    if (status === 'sending') return;

    setDidSubmit(true);
    setErrorMsg(null);

    const cleanEmail = normalizedEmail(email);
    if (!isValidEmail(cleanEmail)) return;

    try {
      setStatus('sending');

      await requestLoginLink({ email: cleanEmail }).unwrap();

      setStatus('sent');

      Alert.alert(
        'Check your email',
        [
          `We’ve sent a secure sign-in link to:`,
          '',
          cleanEmail,
          '',
          'Open the email on this device and tap the link to sign in.',
          'If you don’t see it within a minute, check Spam/Junk or try resending.',
        ].join('\n'),
        [
          { text: 'Close', style: 'cancel' },
          {
            text: 'Open Mail',
            onPress: () => openMailApp(cleanEmail),
          },
        ],
      );
    } catch (e: any) {
      setStatus('error');
      setErrorMsg('Could not send the login link. Please try again.');
    }
  };

  return (
    <Screen name="RegisterScreen" expandToTopEdge>
      <Box flex={1} padding="4xl" backgroundColor="white">
        <Box marginTop="4xl" marginBottom="3xl">
          <Text variant="h4">Enter your email</Text>
          <Text variant="p4" marginTop="md">
            Enter your email and we’ll send you a sign-in link.
          </Text>
        </Box>

        <InputBox
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={v => {
            setEmail(v);
            if (status === 'error') setStatus('idle');
            if (errorMsg) setErrorMsg(null);
          }}
          inputType="email-address"
          capitalizationMode="none"
          isEditable={status !== 'sending'}
          keyboardReturnKeyType="send"
          onReturnKeySubmit={onSendLink}
          error={emailFieldError}
          borderColor={emailFieldError ? 'red' : 'grey'}
          backgroundColor="white"
          labelColor={emailFieldError ? 'red' : 'black'}
        />

        {status === 'error' && errorMsg ? (
          <Box marginTop="xl">
            <Text variant="p4" color="red">
              {errorMsg}
            </Text>
          </Box>
        ) : null}

        <Box marginTop="4xl">
          <Button
            label={status === 'sent' ? 'Resend link' : 'Send login link'}
            backgroundColor="black"
            paddingVertical="lg"
            borderRadius={'xl'}
            isLoading={status === 'sending'}
            isDisabled={!canSubmit}
            onPress={onSendLink}
          />
        </Box>
      </Box>
    </Screen>
  );
};

import React, { useMemo, useState } from 'react';
import { Screen, Box, Text, InputBox } from '../../../components/atom';
import { Button } from '../../../components/atom/Button';
import { isValidEmail, normalizedEmail } from '../../../utils';

export type TRegisterStatus = 'idle' | 'sending' | 'sent' | 'error';

export const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const [status, setStatus] = useState<TRegisterStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailFieldError = useMemo(() => {
    if (!didSubmit) return undefined;
    if (!isValidEmail(normalizedEmail(email))) return 'Invalid email';
    return undefined;
  }, [didSubmit, normalizedEmail]);

  const canSubmit = useMemo(() => {
    return isValidEmail(normalizedEmail(email)) && status !== 'sending';
  }, [normalizedEmail, status]);

  const onSendLink = async () => {
    if (status === 'sending') return;

    setDidSubmit(true);
    setErrorMsg(null);

    if (!isValidEmail(normalizedEmail(email))) return;

    try {
      setStatus('sending');

      // TODO: replace with your API client
      // await api.auth.requestMagicLink({ email: normalizedEmail });

      setStatus('sent');
    } catch (e: any) {
      setStatus('error');
      setErrorMsg('Could not send link. Please try again.');
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

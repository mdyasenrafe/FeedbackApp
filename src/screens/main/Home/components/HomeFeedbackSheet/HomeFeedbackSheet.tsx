import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  BottomSheet,
  Box,
  Button,
  InputBox,
  Text,
} from '../../../../../components/atom';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

type Props = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
};

export const HomeFeedbackSheet: React.FC<Props> = ({ refRBSheet }) => {
  const [value, setValue] = useState(''); // ✅ local feedback text
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const trimmed = useMemo(() => value.trim(), [value]);

  const validationError = useMemo(() => {
    if (!didSubmit) return undefined;
    if (trimmed.length === 0) return 'Feedback is required.';
    return undefined;
  }, [didSubmit, trimmed]);

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    if (trimmed.length === 0) return false;
    return true;
  }, [isSubmitting, trimmed]);

  const onSendFeedback = async () => {
    if (isSubmitting) return; // ✅ prevent double submit
    setDidSubmit(true);
    setErrorMsg(null);

    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      // wait 2500s
      await new Promise(resolve => setTimeout(resolve, 2500));

      setIsSubmitting(false);

      Alert.alert('Thank you!', 'Your feedback has been sent.');
      refRBSheet.current?.close(); // ✅ close only after success
    } catch (e) {
      setIsSubmitting(false);
      setErrorMsg('Could not send feedback. Please try again.');
      // ✅ keep `value` so user doesn’t lose typed text
    }
  };

  return (
    <BottomSheet refRBSheet={refRBSheet} height={360}>
      <Box px="lg" pt="3xl">
        <Box>
          <Text
            variant="h4"
            marginTop="2xl"
            fontFamily="Helvetica-Regular"
            color="black"
            textAlign="center"
          >
            Help us improve Rizon
          </Text>

          <Box mt="sm">
            <Text variant="p3" color="slate" lineHeight={24} textAlign="center">
              Tell us what didn’t feel right, we read every message.
            </Text>
          </Box>
        </Box>

        <Box>
          <InputBox
            placeholder="Enter your feedback"
            height={64}
            borderColor={validationError ? 'red' : 'mist'}
            borderRadius="lg"
            marginTop="lg"
            value={value}
            onChangeText={t => {
              setValue(t);
              if (errorMsg) setErrorMsg(null);
            }}
            isEditable={!isSubmitting}
          />

          {validationError ? (
            <Box mt="sm">
              <Text variant="p4" color="red">
                {validationError}
              </Text>
            </Box>
          ) : null}

          {!validationError && errorMsg ? (
            <Box mt="sm">
              <Text variant="p4" color="red">
                {errorMsg}
              </Text>
            </Box>
          ) : null}
        </Box>

        <Box mt="3xl">
          <Button
            label="Send feedback"
            backgroundColor="black"
            borderRadius="full"
            height={48}
            width={'100%'}
            variant="p3_white"
            onPress={onSendFeedback}
            isLoading={isSubmitting}
            isDisabled={!canSubmit}
            loadingColor="white"
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

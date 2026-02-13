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
import { useCreateFeedbackMutation } from '../../../../../redux/features/feedback/feedback.api';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

type Props = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
};

export const HomeFeedbackSheet: React.FC<Props> = ({ refRBSheet }) => {
  const [value, setValue] = useState('');
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  const trimmed = useMemo(() => value.trim(), [value]);

  const validationError = useMemo(() => {
    if (!didSubmit) return undefined;
    if (trimmed.length === 0) return 'Feedback is required.';
    return undefined;
  }, [didSubmit, trimmed]);

  const canSubmit = useMemo(() => {
    if (isLoading) return false;
    if (trimmed.length === 0) return false;
    return true;
  }, [isLoading, trimmed]);

  const onSendFeedback = async () => {
    if (isLoading) return;
    setDidSubmit(true);
    setErrorMsg(null);

    if (!canSubmit) return;

    try {
      const res = await createFeedback({ message: trimmed }).unwrap();
      console.log('res feedback', res);
      Alert.alert('Thank you!', 'Your feedback has been sent.');
      refRBSheet.current?.close();
    } catch (e: any) {
      setErrorMsg('Could not send feedback. Please try again.');
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
            isEditable={!isLoading}
          />

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
            isLoading={isLoading}
            isDisabled={!canSubmit}
            loadingColor="white"
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

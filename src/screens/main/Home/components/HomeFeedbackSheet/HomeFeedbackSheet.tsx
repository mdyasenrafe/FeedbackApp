import React from 'react';
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
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export const HomeFeedbackSheet: React.FC<Props> = ({
  refRBSheet,
  value,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <BottomSheet refRBSheet={refRBSheet} height={520}>
      <Box padding="4xl">
        <Text variant="h4">Your feedback</Text>
        <Text variant="p4" marginTop="md">
          Tell us what you think.
        </Text>

        <Box marginTop="3xl">
          <InputBox
            label="Feedback"
            placeholder="Type your feedback…"
            value={value}
            onChangeText={onChange}
            inputType="default"
            capitalizationMode="sentences"
            isEditable={true}
          />
        </Box>

        <Box marginTop="3xl">
          <Button
            label="Submit"
            backgroundColor="black"
            paddingVertical="lg"
            borderRadius="xl"
            onPress={onSubmit}
            isDisabled={!value.trim()}
          />
        </Box>

        <Box marginTop="lg">
          <Button
            label="Cancel"
            backgroundColor="white"
            paddingVertical="lg"
            borderRadius="xl"
            onPress={onCancel}
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

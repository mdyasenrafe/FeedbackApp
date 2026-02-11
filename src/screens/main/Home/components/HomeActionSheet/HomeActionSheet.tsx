import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BottomSheet, Box, Button, Text } from '../../../../../components/atom';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

type Props = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
  onSave: () => void;
  onLogout: () => void;
};

export const HomeActionSheet: React.FC<Props> = ({
  refRBSheet,
  onSave,
  onLogout,
}) => {
  return (
    <BottomSheet refRBSheet={refRBSheet} height={460}>
      <Box padding="4xl">
        <Text variant="h4">Quick actions</Text>
        <Text variant="p4" marginTop="md">
          Save feedback or logout.
        </Text>

        <Box marginTop="3xl">
          <Button
            label="Save"
            backgroundColor="black"
            paddingVertical="lg"
            borderRadius="xl"
            onPress={onSave}
          />
        </Box>

        <Box marginTop="lg">
          <Button
            label="Logout"
            backgroundColor="red"
            paddingVertical="lg"
            borderRadius="xl"
            onPress={onLogout}
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

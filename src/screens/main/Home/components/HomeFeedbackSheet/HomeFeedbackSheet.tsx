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
};

export const HomeFeedbackSheet: React.FC<Props> = ({ refRBSheet }) => {
  return (
    <BottomSheet refRBSheet={refRBSheet} height={520}>
      <Box padding="4xl">
        <Text variant="h4">Your feedback</Text>
      </Box>
    </BottomSheet>
  );
};

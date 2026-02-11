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
    <BottomSheet refRBSheet={refRBSheet} height={335}>
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
            borderColor="mist"
            borderRadius="lg"
            marginTop="lg"
          />
        </Box>
        <Box mt="3xl">
          <Button
            label="Send feedback"
            backgroundColor="black"
            borderRadius="full"
            height={48}
            width={'100%'}
            variant="p3_white"
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

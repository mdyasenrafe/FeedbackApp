import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  BottomSheet,
  Box,
  Button,
  RemoteImage,
  Row,
  Text,
} from '../../../../../components/atom';
import Logo from '../../../../../assets/images/logo.png';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

type Props = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
  onPressNotYet: () => void;
  onPressYesLovingIt: () => void;
};

export const HomeActionSheet: React.FC<Props> = ({
  refRBSheet,
  onPressNotYet,
  onPressYesLovingIt,
}) => {
  return (
    <BottomSheet refRBSheet={refRBSheet} height={400}>
      <Box px="lg" pt="3xl">
        <RemoteImage
          source={Logo}
          style={{ width: 120, height: 120, alignSelf: 'center' }}
        />

        <Text
          variant="h4"
          marginTop="2xl"
          fontFamily="Helvetica-Regular"
          color="black"
          textAlign="center"
        >
          Enjoying Rizon so far?
        </Text>

        <Box mt="sm">
          <Text variant="p3" color="slate" lineHeight={24} textAlign="center">
            Your feedback helps us build a better money experience.
          </Text>
        </Box>

        <Row marginTop="3xl" gap="sm">
          <Button
            label="Not yet"
            backgroundColor="white"
            borderRadius="full"
            height={48}
            width={'50%'}
            variant="p3"
            borderColor="mist"
            borderWidth={1}
            onPress={onPressNotYet}
          />
          <Button
            label="Yes, loving it"
            backgroundColor="black"
            borderRadius="full"
            height={48}
            width={'50%'}
            variant="p3_white"
            onPress={onPressYesLovingIt}
          />
        </Row>
      </Box>
    </BottomSheet>
  );
};

import React from 'react';
import { Alert, Linking, Platform } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  BottomSheet,
  Box,
  Button,
  RemoteImage,
  Text,
} from '../../../../../components/atom';
import Review from '../../../../../assets/images/review.png';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

type Props = {
  refRBSheet: React.RefObject<RBSheetRef | null>;
};

const IOS_STORE_URL =
  'https://apps.apple.com/us/app/rizon-stablecoin-finance/id6745082515';
const ANDROID_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.rizon.app';

export const HomeStoreSheet: React.FC<Props> = ({ refRBSheet }) => {
  const onLeaveReview = async () => {
    const url = Platform.OS === 'ios' ? IOS_STORE_URL : ANDROID_STORE_URL;

    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Unable to open store', 'Please try again later.');
        return;
      }

      await Linking.openURL(url);

      refRBSheet.current?.close();
    } catch {
      Alert.alert('Unable to open store', 'Please try again later.');
    }
  };

  return (
    <BottomSheet refRBSheet={refRBSheet} height={375}>
      <Box px="lg" pt="3xl">
        <RemoteImage
          source={Review}
          style={{ width: 120, height: 120, alignSelf: 'center' }}
        />

        <Text
          variant="h4"
          marginTop="2xl"
          fontFamily="Helvetica-Regular"
          color="black"
          textAlign="center"
        >
          Got a minute to help us grow?
        </Text>

        <Box mt="sm">
          <Text variant="p3" color="slate" lineHeight={24} textAlign="center">
            It takes less than a minute and helps us a lot.
          </Text>
        </Box>

        <Box mt="3xl">
          <Button
            label="Leave a review"
            backgroundColor="black"
            borderRadius="full"
            height={48}
            width={'100%'}
            variant="p3_white"
            onPress={onLeaveReview}
          />
        </Box>
      </Box>
    </BottomSheet>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Screen, Text } from '../../../components/atom';
import type { RootState } from '../../../redux/store';
import { HomeFeedbackSheet } from './components/HomeFeedbackSheet';
import { HomeActionSheet } from './components/HomeActionSheet';
import { HomeStoreSheet } from './components/HomeStoreSheet';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

export const Home = () => {
  const { top } = useSafeAreaInsets();
  const user = useSelector((s: RootState) => s.auth.user);

  const actionSheetRef = useRef<RBSheetRef>(null);
  const feedbackSheetRef = useRef<RBSheetRef>(null);
  const storeSheetRef = useRef<RBSheetRef>(null);

  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const t = setTimeout(() => actionSheetRef.current?.open(), 250);
    return () => clearTimeout(t);
  }, []);

  const onPressNotYet = () => {
    actionSheetRef.current?.close();
    setTimeout(() => feedbackSheetRef.current?.open(), 250);
  };

  const onPressYesLovingIt = () => {
    actionSheetRef.current?.close();
    setTimeout(() => storeSheetRef.current?.open(), 250);
  };

  const openStoreSheet = () => {
    storeSheetRef.current?.open();
  };

  return (
    <Screen name="Home" expandToTopEdge>
      <Box
        flex={1}
        px="lg"
        backgroundColor="white"
        style={{ paddingTop: top + 16 }}
      >
        <Text variant="h1">Home</Text>

        {user?.email ? (
          <Text variant="p4" marginTop="md">
            Logged in as {user.email}
          </Text>
        ) : null}

        <HomeActionSheet
          refRBSheet={actionSheetRef}
          onPressNotYet={onPressNotYet}
          onPressYesLovingIt={onPressYesLovingIt}
        />

        <HomeFeedbackSheet refRBSheet={feedbackSheetRef} />

        <HomeStoreSheet refRBSheet={storeSheetRef} />
      </Box>
    </Screen>
  );
};

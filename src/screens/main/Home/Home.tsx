import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Box, Screen, Text } from '../../../components/atom';
import type { RootState } from '../../../redux/store';
import { clearAuth } from '../../../redux/features/auth.slice';
import { clearAuthFromStorage } from '../../../redux/features/auth.storage';
import { HomeFeedbackSheet } from './components/HomeFeedbackSheet';
import { HomeActionSheet } from './components/HomeActionSheet';

type RBSheetRef = React.ElementRef<typeof RBSheet>;

export const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);

  const actionSheetRef = useRef<RBSheetRef>(null);
  const feedbackSheetRef = useRef<RBSheetRef>(null);

  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // show once on mount (session only)
    const t = setTimeout(() => actionSheetRef.current?.open(), 250);
    return () => clearTimeout(t);
  }, []);

  const logout = async () => {
    try {
      actionSheetRef.current?.close();
      feedbackSheetRef.current?.close();

      dispatch(clearAuth());
      await clearAuthFromStorage();
    } catch {
      Alert.alert('Logout failed', 'Please try again.');
    }
  };

  const openFeedback = () => {
    actionSheetRef.current?.close();
    setTimeout(() => feedbackSheetRef.current?.open(), 250);
  };

  const submitFeedback = () => {
    const trimmed = feedback.trim();
    if (!trimmed) {
      Alert.alert('Feedback required', 'Please enter your feedback.');
      return;
    }

    Alert.alert('Saved', 'Your feedback was saved.');
    setFeedback('');
    feedbackSheetRef.current?.close();
  };

  return (
    <Screen name="Home">
      <Box flex={1} padding="4xl" backgroundColor="white">
        <Text variant="h1">Home</Text>
        {user?.email ? (
          <Text variant="p4" marginTop="md">
            Logged in as {user.email}
          </Text>
        ) : null}

        <HomeActionSheet
          refRBSheet={actionSheetRef}
          onSave={openFeedback}
          onLogout={logout}
        />

        <HomeFeedbackSheet
          refRBSheet={feedbackSheetRef}
          value={feedback}
          onChange={setFeedback}
          onSubmit={submitFeedback}
          onCancel={() => feedbackSheetRef.current?.close()}
        />
      </Box>
    </Screen>
  );
};

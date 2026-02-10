import React from 'react';
import { Box, Button, Screen, Text } from '../../../components/atom';
import { OnboardingStackScreenProps } from '../../../navigation/types';

export const AdditionalOnboardingScreen = ({
  navigation,
}: OnboardingStackScreenProps<'AdditionalOnboardingScreen'>) => {
  return (
    <Screen name="AdditionalOnboardingScreen" expandToTopEdge>
      <Box
        flex={1}
        justifyContent="center"
        padding="4xl"
        backgroundColor="white"
      >
        <Box alignItems="center" marginBottom="5xl">
          <Text variant="h2" textAlign="center">
            Welcome to{`\n`}Feedback App
          </Text>

          <Text variant="p3" marginTop="xl" textAlign="center" opacity={0.7}>
            Sign in with your email to submit feedback.
          </Text>
        </Box>

        <Button
          label="Continue with email"
          backgroundColor="black"
          paddingVertical="lg"
          borderRadius={'xl'}
          // onPress={() => navigation.navigate('EmailLinkScreen')}
        />
      </Box>
    </Screen>
  );
};

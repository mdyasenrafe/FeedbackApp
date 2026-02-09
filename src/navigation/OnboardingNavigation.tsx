import { createStackNavigator } from '@react-navigation/stack';
import { AdditionalOnboardingScreen } from '../screens/onboardingScreen';
import { OnboardingScreenParamList } from './types';

const Stack = createStackNavigator<OnboardingScreenParamList>();

export const OnboardingNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="OnboardingScreen"
        component={AdditionalOnboardingScreen}
      />
    </Stack.Navigator>
  );
};

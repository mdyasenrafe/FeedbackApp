import { createStackNavigator } from '@react-navigation/stack';
import {
  AdditionalOnboardingScreen,
  RegisterScreen,
} from '../screens/onboardingScreen';
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
        name="AdditionalOnboardingScreen"
        component={AdditionalOnboardingScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

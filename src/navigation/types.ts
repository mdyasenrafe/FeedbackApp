import { StackScreenProps } from '@react-navigation/stack';

export type OnboardingScreenParamList = {
  AdditionalOnboardingScreen: undefined;
  RegisterScreen: undefined;
};

export type MainScreenParamList = {
  Home: undefined;
};

export type MainStackScreenProps<T extends keyof MainScreenParamList> =
  StackScreenProps<MainScreenParamList, T>;

export type OnboardingStackScreenProps<
  T extends keyof OnboardingScreenParamList,
> = StackScreenProps<OnboardingScreenParamList, T>;

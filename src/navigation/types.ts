import { StackScreenProps } from '@react-navigation/stack';

export type OnboardingScreenParamList = {
  OnboardingScreen: undefined;
};

export type MainScreenParamList = {
  Home: undefined;
  Search: { axisKey: string };
  MedicineDetails: { pharmacologicalTarget: string; id: string };
  AiChat: undefined;
};

export type MainStackScreenProps<T extends keyof MainScreenParamList> =
  StackScreenProps<MainScreenParamList, T>;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreenParamList } from './types';
import { Home } from '../screens/main';

const Stack = createNativeStackNavigator<MainScreenParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

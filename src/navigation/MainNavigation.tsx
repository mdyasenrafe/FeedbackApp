import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreenParamList } from './types';
import { AiChat, Home, MedicineDetails, Search } from '../screens/main';

const Stack = createNativeStackNavigator<MainScreenParamList>();

export const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        // ✅ Default transition for all screens
        animation: 'slide_from_right',

        // smooth back gesture on iOS
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="MedicineDetails"
        component={MedicineDetails}
        options={{
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="AiChat"
        component={AiChat}
        options={{
          // presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

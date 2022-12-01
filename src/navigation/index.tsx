import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from './navTypes';
import { ArtworkDetailScreen, ArtworkListScreen } from '../views';

export const AppNavigator = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        initialRouteName="ArtworkList"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ArtworkList" component={ArtworkListScreen} />
        <Stack.Screen name="ArtworkDetail" component={ArtworkDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

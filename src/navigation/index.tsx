import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppStackParamList } from './navTypes';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ArtworkDetailScreen, ArtworkListScreen } from '../views';
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('screen');

const gestureHandlerConfig = {
  ...(Platform.OS === 'ios'
    ? {
        gestureResponseDistance: width > height ? width : height,
      }
    : {}),
};

export const AppNavigator = () => {
  const Stack = createStackNavigator<AppStackParamList>();
  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        initialRouteName="ArtworkList"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
          ...gestureHandlerConfig,
        }}>
        <Stack.Screen name="ArtworkList" component={ArtworkListScreen} />
        <Stack.Screen name="ArtworkDetail" component={ArtworkDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

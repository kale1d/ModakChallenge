import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppStackParamList = {
  ArtworkList: undefined;
  ArtworkDetail: { id: number };
};

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

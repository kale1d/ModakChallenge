import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppStackParamList = {
  ArtworkList: undefined;
  ArtworkDetail: { id: number };
  ArtworkFavorites: undefined;
};

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppStackParamList>;

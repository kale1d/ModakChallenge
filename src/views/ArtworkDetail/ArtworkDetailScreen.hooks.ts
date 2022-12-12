import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../navigation/navTypes';
import { apiProvider } from '../../provider/apiProvider';
import { ArtworkDetail } from '../../types/Artworks.types';
import { getImageURL, IMAGE_SIZE } from '../../utils/util';

type ArtworkDetailScreenRouteProp = RouteProp<
  AppStackParamList,
  'ArtworkDetail'
>;

const INITIAL_STATE = {
  artwork_type_title: '',
  date_display: '',
  image_id: '',
  medium_display: '',
  style_title: '',
  image: '',
  artist_title: '',
};

export const useArtworkDetail = () => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const route = useRoute<ArtworkDetailScreenRouteProp>();
  const id = route.params?.id || 0;
  const [artwork, setArtwork] = useState<ArtworkDetail>(INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const getArtworkDetail = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await apiProvider.getArtwork({ id });
      if (!error && data) {
        const image = getImageURL({ id: data.image_id, size: IMAGE_SIZE.M });
        setArtwork({ ...data, image });
      }
    } catch (e) {
      console.error({ e });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!artwork.date_display) {
      getArtworkDetail();
    }
  }, [artwork.date_display]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleOnPressFavorite = useCallback(async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');

      let parsedFavorites: ArtworkDetail[] = [];
      if (favorites) {
        parsedFavorites = JSON.parse(favorites);
        if (!isSelected) {
          const asd = [...parsedFavorites, artwork];
          await AsyncStorage.setItem('favorites', JSON.stringify(asd));
          setIsSelected(true);
        } else {
          const indexOfArtwork = parsedFavorites.findIndex(
            (fav: ArtworkDetail) => fav.image_id === artwork.image_id,
          );
          await AsyncStorage.removeItem('favorites');
          const filteredArtworks = parsedFavorites.splice(0, indexOfArtwork);
          await AsyncStorage.setItem(
            'favorites',
            JSON.stringify(filteredArtworks),
          );
          setIsSelected(false);
        }
      } else {
        const aaa = JSON.stringify([artwork]);
        await AsyncStorage.setItem('favorites', aaa);
        setIsSelected(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [artwork]);

  return { loading, artwork, goBack, handleOnPressFavorite, isSelected };
};

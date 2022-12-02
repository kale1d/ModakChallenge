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

  return { loading, artwork, goBack };
};

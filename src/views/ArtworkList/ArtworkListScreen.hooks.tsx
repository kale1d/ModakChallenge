import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

import { AppStackNavigationProp } from '../../navigation/navTypes';
import { apiProvider } from '../../provider/apiProvider';
import { Artwork } from '../../types/Artworks.types';

import { FadeInImage } from '../../components/FadeInImage';
import { getImageURL, IMAGE_SIZE } from '../../utils/util';

import { styles } from './ArtworkList.styles';

export const useArtworkList = () => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);

  const getArtworkList = useCallback(async () => {
    try {
      const { data, error } = await apiProvider.getArtworks({ page });
      if (data && !error) {
        const test = data.map((a) => {
          const img = getImageURL({
            id: a.image_id,
            size: IMAGE_SIZE.XS,
          });
          return { ...a, image: img };
        });
        setArtworks(() => (artworks.length ? [...artworks, ...test] : test));
      }
    } catch (e) {
      console.error(e);
    }
  }, [page]);

  const getMoreArtworks = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const goToDetail = useCallback(
    ({ id }: { id: number }) => {
      navigation.navigate('ArtworkDetail', { id });
    },
    [navigation],
  );

  useEffect(() => {
    if (!artworks.length) {
      getArtworkList();
    }
  }, [artworks.length]);

  useEffect(() => {
    if (artworks.length) {
      getArtworkList();
    }
  }, [page]);

  return {
    artworks,
    goToDetail,
    getMoreArtworks,
  };
};

export const useFlatListElements = ({
  goToDetail,
}: {
  goToDetail: ({ id }: { id: number }) => void;
}) => {
  const renderItem = useCallback(
    ({ item, index }: { item: Artwork; index: number }) => {
      const isEven = index % 2 === 0;
      return (
        <TouchableOpacity onPress={() => goToDetail({ id: item.id })}>
          <View
            style={[
              isEven ? styles.evenRow : styles.oddRow,
              styles.flex1,
              styles.alignItemsCenter,
            ]}>
            <FadeInImage
              image={item.image}
              style={[styles.flexGrow1, styles.imageSize]}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist_title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  const keyExtractor = useCallback(({ id }: { id: number }) => `${id}`, []);

  return { renderItem, keyExtractor };
};

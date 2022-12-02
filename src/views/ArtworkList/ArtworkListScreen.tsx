import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppStackNavigationProp } from '../../navigation/navTypes';
import { apiProvider } from '../../provider/apiProvider';
import { Artwork } from '../../types/Artworks.types';
import { Colors } from '../../utils/colors';
import { getImageURL, IMAGE_SIZE, randomColor } from '../../utils/util';

export const ArtworkListScreen: React.FC = () => {
  const navigation = useNavigation<AppStackNavigationProp>();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getArtworkList = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await apiProvider.getArtworks({ page });
      if (data && !error) {
        const test = data.map((a) => {
          const img = getImageURL({
            id: a.image_id,
            size: IMAGE_SIZE.XS,
          });
          return { ...a, image: img };
        });
        setArtworks(() => [...artworks, ...test]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const getMoreArtworks = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const goToDetail = useCallback(({ id }: { id: number }) => {
    return navigation.navigate('ArtworkDetail', { id });
  }, []);

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

  const renderItem = useCallback(
    ({ item, index }: { item: Artwork; index: number }) => {
      const isEven = index % 2 === 0;
      return (
        //agregar placeholder
        <TouchableOpacity onPress={() => goToDetail({ id: item.id })}>
          <View
            style={[
              isEven
                ? { flexDirection: 'row', backgroundColor: Colors.KOBI }
                : {
                    flexDirection: 'row-reverse',
                    justifyContent: 'flex-end',
                    backgroundColor: Colors.PURPLE_MOUNTAIN,
                  },
              {
                flex: 1,
                alignItems: 'center',
              },
            ]}>
            <Image
              source={{ uri: item.image }}
              style={[{ flexGrow: 1 }, { width: 150, height: 150 }]}
            />
            <View
              style={{
                flexGrow: 3,
                flexShrink: 1,
                marginLeft: 16,
              }}>
              <Text style={{ fontFamily: 'Staatliches-Regular', fontSize: 22 }}>
                {item.title}
              </Text>
              <Text style={{ fontFamily: 'Staatliches-Regular', fontSize: 16 }}>
                {item.artist_title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [],
  );

  const keyExtractor = useCallback(({ id }: { id: number }) => `${id}`, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.CAMEO_PINK }}>
      <FlatList
        data={artworks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={getMoreArtworks}
      />
    </SafeAreaView>
  );
};

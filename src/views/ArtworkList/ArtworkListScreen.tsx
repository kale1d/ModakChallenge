import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiProvider } from '../../provider/apiProvider';
import { Artwork } from '../../types/Artworks.types';
import { getImageURL, IMAGE_SIZE } from '../../util';

export const ArtworkListScreen = () => {
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
      console.log({ e });
    } finally {
      setLoading(false);
    }
  }, [page]);

  const getMoreArtworks = useCallback(() => {
    setPage(page + 1);
  }, [page]);

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

  const renderItem = ({ item }: { item: Artwork }) => {
    return (
      //agregar placeholder
      <View>
        <Text>{item.title}</Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgrey' }}>
      <FlatList
        data={artworks}
        keyExtractor={(_, index) => String(index)}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={getMoreArtworks}
      />
    </SafeAreaView>
  );
};

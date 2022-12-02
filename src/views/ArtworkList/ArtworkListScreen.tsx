import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useArtworkList, useFlatListElements } from './ArtworkListScreen.hooks';
import { styles } from './ArtworkList.styles';

export const ArtworkListScreen: React.FC = () => {
  const { artworks, goToDetail, getMoreArtworks } = useArtworkList();
  const { renderItem, keyExtractor } = useFlatListElements({ goToDetail });

  return (
    <SafeAreaView style={[styles.flex1, styles.container]}>
      <FlatList
        data={artworks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={getMoreArtworks}
        ListFooterComponent={<ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

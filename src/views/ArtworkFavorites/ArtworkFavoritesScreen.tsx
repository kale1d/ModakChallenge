import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useArtworkList,
  useFlatListElements,
} from './ArtworkFavoritesScreen.hooks';
import { styles } from './ArtworkFavorites.styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

export const ArtworkFavoritesScreen: React.FC = () => {
  const { artworks, goToDetail, goBack } = useArtworkList();
  const { renderItem, keyExtractor } = useFlatListElements({ goToDetail });

  return (
    <SafeAreaView style={[styles.flex1, styles.container]}>
      <TouchableHighlight onPress={goBack}>
        <Text>go back</Text>
      </TouchableHighlight>
      <FlatList
        data={artworks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<ActivityIndicator />}
      />
    </SafeAreaView>
  );
};

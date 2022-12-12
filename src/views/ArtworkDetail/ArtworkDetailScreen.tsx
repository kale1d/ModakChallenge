import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../utils/colors';
import { PinchToZoom } from '../../components/PinchToZoom';
import { ListItem } from './components/ListItem';

import { useArtworkDetail } from './ArtworkDetailScreen.hooks';
import { styles } from './ArtworkDetail.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ArtworkDetailScreen: React.FC = () => {
  const { loading, artwork, goBack, handleOnPressFavorite, isSelected } =
    useArtworkDetail();

  // useEffect(() => {
  //   const removeItem = async () => await AsyncStorage.removeItem('favorites');
  //   removeItem();
  // }, []);

  return (
    <SafeAreaView style={[styles.flex1, styles.container]}>
      <TouchableWithoutFeedback onPress={goBack} style={styles.goBack}>
        <Text>{'<'}</Text>
      </TouchableWithoutFeedback>
      {loading ? (
        <View style={[styles.flex1, styles.loading]}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          <PinchToZoom
            image={artwork.image}
            pressed={isSelected}
            onPressFavorite={handleOnPressFavorite}
          />
          <View style={styles.flex1}>
            <ListItem
              title="Artist"
              description={artwork.artist_title}
              backgroundColor={Colors.KOBI}
            />
            <ListItem
              title="Date"
              description={artwork.date_display}
              backgroundColor={Colors.PASTEL_PINK}
            />
            <ListItem
              title="Medium"
              description={artwork.medium_display}
              backgroundColor={Colors.PURPLE_MOUNTAIN}
            />
            <ListItem
              title="Style"
              description={artwork.style_title}
              backgroundColor={Colors.MIDDLE_PURPLE}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

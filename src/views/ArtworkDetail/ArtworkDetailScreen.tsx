import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PinchToZoom } from '../../components/PinchToZoom';
import {
  AppStackNavigationProp,
  AppStackParamList,
} from '../../navigation/navTypes';
import { apiProvider } from '../../provider/apiProvider';
import { ArtworkDetail } from '../../types/Artworks.types';
import { Colors } from '../../utils/colors';
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

export const ArtworkDetailScreen: React.FC = () => {
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

  const ListItem = ({
    title,
    description,
    backgroundColor,
  }: {
    title: string;
    description: string;
    backgroundColor: Partial<Colors>;
  }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          paddingHorizontal: 8,
          paddingVertical: 16,
          backgroundColor: backgroundColor,
        }}>
        <Text
          style={{ marginRight: 4, fontFamily: 'Roboto-Black', fontSize: 16 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: 'Roboto-Medium', flexShrink: 1 }}>
          {!description ? 'unknown' : description}
        </Text>
        <View></View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.CAMEO_PINK, flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={goBack}
        style={{ marginLeft: 16, marginVertical: 16 }}>
        <Text>{'<'}</Text>
      </TouchableWithoutFeedback>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView>
          <PinchToZoom image={artwork.image} />
          <View style={{ flex: 1 }}>
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

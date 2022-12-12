import React, { useEffect } from 'react';
import { ImageStyle, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const FadeInImage: React.FC<{
  image?: string;
  style: ImageStyle[];
  isFavorite?: boolean;
  pressed?: boolean;
  onPressFavorite?: () => void;
  resizeMode: 'cover' | 'repeat' | 'stretch' | 'contain' | 'center';
}> = ({
  image,
  style,
  resizeMode,
  isFavorite = false,
  pressed = false,
  onPressFavorite,
  ...props
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
  }, [opacity]);

  return (
    <View>
      <Animated.Image
        {...props}
        resizeMode={resizeMode}
        source={{ uri: image }}
        style={[style, animatedStyle]}
      />
      {isFavorite && (
        <TouchableWithoutFeedback onPress={onPressFavorite}>
          {!pressed ? <Text>Favorito</Text> : <Text>Remover</Text>}
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

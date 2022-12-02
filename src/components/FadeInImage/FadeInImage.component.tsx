import React, { useEffect } from 'react';
import { ImageStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const FadeInImage: React.FC<{ image?: string; style: ImageStyle[] }> = ({
  image,
  style,
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
    <Animated.Image
      {...props}
      source={{ uri: image }}
      style={[style, animatedStyle]}
    />
  );
};

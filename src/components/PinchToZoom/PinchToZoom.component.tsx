import { Dimensions, StyleSheet } from 'react-native';
import GestureHandler, {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useValue,
  withTiming,
} from 'react-native-reanimated';
import { FadeInImage } from '../FadeInImage';

const { width, height } = Dimensions.get('window');

export const PinchToZoom = ({ image }: { image?: string }) => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const onPinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: focalX.value },
        { translateY: focalY.value },
        { translateX: -width / 2 },
        { translateY: -height / 2 },
        { scale: scale.value },
        { translateX: -focalX.value },
        { translateY: -focalY.value },
        { translateX: width / 2 },
        { translateY: height / 2 },
      ],
    };
  });

  const focalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={onPinchHandler}>
      <Animated.View>
        <FadeInImage
          image={image}
          resizeMode="cover"
          style={[{ width: width, minHeight: height / 1.5 }, animatedStyle]}
        />
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              width: 20,
              height: 20,
              borderRadius: 10,
            },
            focalPointStyle,
          ]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

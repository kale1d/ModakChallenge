import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iPhone 11 scale
const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//for width  pixel
export const normalizeHorizontal = (size: number) => {
  return normalize(size, 'width');
};
//for height  pixel
export const normalizeVertical = (size: number) => {
  return normalize(size, 'height');
};

export const normalizeFont = (size: number) => {
  return normalizeVertical(size) + (Platform.OS === 'android' ? 2 : 0);
};

export const Spacing = {
  space4H: normalizeHorizontal(4),
  space4V: normalizeVertical(4),
  space8V: normalizeVertical(8),
  space8H: normalizeHorizontal(8),
  space16V: normalizeVertical(16),
  space16H: normalizeHorizontal(16),
  space24V: normalizeVertical(24),
  space24H: normalizeHorizontal(24),
  space32V: normalizeVertical(32),
  space32H: normalizeHorizontal(32),
};

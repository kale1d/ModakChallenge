import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import {
  normalizeFont,
  normalizeHorizontal,
  normalizeVertical,
  Spacing,
} from '../../utils/spacing';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CAMEO_PINK,
  },
  flex1: {
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  evenRow: {
    flexDirection: 'row',
    backgroundColor: Colors.KOBI,
  },
  oddRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    backgroundColor: Colors.PURPLE_MOUNTAIN,
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  flexGrow1: {
    flexGrow: 1,
  },
  imageSize: {
    width: normalizeHorizontal(150),
    height: normalizeVertical(150),
  },
  info: {
    flexGrow: 3,
    flexShrink: 1,
    marginLeft: Spacing.space16H,
  },
  title: {
    fontFamily: 'Staatliches-Regular',
    fontSize: normalizeFont(22),
  },
  artist: {
    fontFamily: 'Staatliches-Regular',
    fontSize: normalizeFont(16),
  },
});

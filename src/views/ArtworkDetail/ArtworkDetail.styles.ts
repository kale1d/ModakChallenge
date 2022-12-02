import { StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';
import { Spacing } from '../../utils/spacing';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.CAMEO_PINK,
  },
  flex1: {
    flex: 1,
  },
  goBack: {
    marginLeft: Spacing.space16H,
    marginVertical: Spacing.space16V,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

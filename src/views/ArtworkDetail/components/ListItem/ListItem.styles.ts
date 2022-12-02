import { StyleSheet } from 'react-native';
import { normalizeFont, Spacing } from '../../../../utils/spacing';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.space8H,
    paddingVertical: Spacing.space16V,
  },
  title: {
    marginRight: Spacing.space4H,
    fontFamily: 'Roboto-Black',
    fontSize: normalizeFont(16),
  },
  description: {
    fontFamily: 'Roboto-Medium',
    flexShrink: 1,
  },
});

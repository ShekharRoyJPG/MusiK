import {StyleSheet} from 'react-native';
import {colors} from '../Constants/colors';
import {fontSize, spacing} from '../Constants/dimensions';
import {fontFamilies} from '../Constants/fonts';

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  headingText: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.bold,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
});

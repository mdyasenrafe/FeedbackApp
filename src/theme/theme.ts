import {createTheme} from '@shopify/restyle';
import {
  BASE_BORDER_RADII,
  BASE_COLORS,
  BASE_SPACING,
  BASE_TEXT_VARIANTS,
} from './elements';

export const theme = createTheme({
  colors: BASE_COLORS,
  spacing: BASE_SPACING,
  textVariants: BASE_TEXT_VARIANTS,
  borderRadii: BASE_BORDER_RADII,
});

export type Theme = typeof theme;

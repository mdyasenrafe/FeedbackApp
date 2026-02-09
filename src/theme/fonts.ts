export type AppThemeFonts = {
  extraBold: string;
  bold: string;
  medium: string;
  regular: string;
  semiBold: string;
};

export const fontAssets = {
  'Urbanist-Regular': require('../assets/fonts/Urbanist-Regular.ttf'),
  'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
  'Urbanist-SemiBold': require('../assets/fonts/Urbanist-SemiBold.ttf'),
  'Urbanist-Bold': require('../assets/fonts/Urbanist-Bold.ttf'),
  'Urbanist-ExtraBold': require('../assets/fonts/Urbanist-ExtraBold.ttf'),
};

export const FONTS: AppThemeFonts = {
  extraBold: 'Urbanist-ExtraBold',
  bold: 'Urbanist-Bold',
  medium: 'Urbanist-Medium',
  regular: 'Urbanist-Regular',
  semiBold: 'Urbanist-SemiBold',
};

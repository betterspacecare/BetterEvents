// Centralized color palette for the app - Soft Pastel Theme
export const colors = {
  // Primary colors - Soft Pastels
  primary: '#CCD4FF',
  primaryLight: '#E8ECFF',
  primaryDark: '#A8B5FF',

  // Status colors - Soft & Gentle
  success: '#C5E9E4',
  successLight: '#E5F5F3',
  warning: '#F6E7AC',
  warningLight: '#FDF6E3',
  error: '#F4AE9D',
  errorLight: '#FCE8E3',
  info: '#CCD4FF',
  infoLight: '#E8ECFF',

  // Neutral colors
  white: '#ffffff',
  black: '#181713',
  gray50: '#fafafa',
  gray100: '#f5f5f5',
  gray200: '#eeeeee',
  gray300: '#e0e0e0',
  gray400: '#bdbdbd',
  gray500: '#9e9e9e',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#3F3F3F',

  // Accent colors - Soft Pastels from the image
  purple: '#CCD4FF',
  purpleDark: '#6B7FD7', // Darker purple for better contrast
  purpleText: '#5A6BC7', // Even darker for text/icons
  pink: '#F4AE9D',
  yellow: '#F6E7AC',
  amber: '#F6E7AC',
  amberText: '#D4A017', // Darker amber for text on light backgrounds
  orange: '#E56600',
  deepOrange: '#E56600',
  green: '#C5E9E4',
  greenText: '#2D7A6E', // Darker green for text on light backgrounds
  blue: '#CCD4FF',
  cyan: '#C5E9E4',
  teal: '#C5E9E4',
  lime: '#C5E9E4',
  rose: '#F4AE9D',
  coral: '#F4AE9D',
  coralText: '#C85A3E', // Darker coral for text on light backgrounds

  // Sunny/Warm colors from the palette
  sunYellow: '#F6E7AC',
  goldenOrange: '#E56600',
  peach: '#F4AE9D',

  // Dark accent
  darkGray: '#3F3F3F',

  // Gradient colors
  gradientStart: '#F6E7AC',
  gradientEnd: '#E56600',
  gradientPurple: '#CCD4FF',
  gradientPink: '#F4AE9D',
};

export const statusColors = {
  confirmed: colors.success,
  pending: colors.warning,
  planning: colors.primary,
  cancelled: colors.error,
};

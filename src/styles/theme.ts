const calRem = (size: number): string => `${size / 16}rem`;

const fontSize = {
  status: calRem(8),
  xs: calRem(12),
  sm: calRem(14),
  smm: calRem(15),
  md: calRem(16),
  lg: calRem(18),
  la: calRem(20),
  sxl: calRem(24),
  xl: calRem(26),
  xxl: calRem(28),
  tab: calRem(36),
};

const fontWeight = {
  black: 900,
  extraBold: 800,
  bold: 700,
  semiBold: 600,
  regular: 400,
  light: 300,
};

const color = {
  brandColor: '#FF9900',
  skyblue: '#D4F0FF',
  bgColor: '#F8F8F8',
  lightGray: '#E7E7E7',
  OpacityGray: 'rgba(231,231,231,0.5)',
  gray: '#C4C4C4',
  darkGray: '#686868',
  black: '#2C2C2C',
  white: '#FDFDFD',
  danger: '#FF0005',
  safe: '#00C314',
};

const deviceSize = {
  mobile: '(max-width: 395px)',
  tablet: '(min-width: 600px)',
};

const theme = {
  fontSize,
  fontWeight,
  color,
  deviceSize,
};

export default theme;

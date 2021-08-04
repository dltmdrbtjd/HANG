const calRem = size => `${size / 16}rem`;

const fontSize = {
  xs: calRem(12),
  sm: calRem(14),
  md: calRem(16),
  lg: calRem(18),
  la: calRem(20),
  sxl: calRem(24),
  xl: calRem(26),
  xxl: calRem(28),
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
  bgColor: '#F5F5F5',
  lightG: '#FDFDFD',
  semiLightG: '#E7E7E7',
  gray: '#C4C4C4',
  darkG: '#686868',
  black: '#2C2C2C',
  white: '#FDFDFD',
  danger: '#FF0005',
  safe: '#00C314',
};

const theme = {
  fontSize,
  fontWeight,
  color,
};

export default theme;

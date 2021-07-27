// font-size 5가지?
// 기기별 사이즈 -> 768,1024 ? 충분데쓰
// 색상 7개?
const calRem = size => `${size / 16}rem`;

const fontSize = {
  xs: calRem(14),
  sm: calRem(16),
  md: calRem(18),
  lg: calRem(20),
  xl: calRem(22),
};

const color = {
  brandColor: '#FF9900',
  black: '#2C2C2C',
  gray: '#272727',
  skyblue: '#D4F0FF',
  bgColor: '#F5F5F5',
  white: '#FDFDFD',
};

const theme = {
  fontSize,
  color,
};

export default theme;

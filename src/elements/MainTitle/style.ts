import styled from 'styled-components';
// mixin
import { borderBox, textProps } from 'src/styles/Mixin';

export interface Prop {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  addstyle?: any;
}

const MainTitleStyle = styled.h2<Prop>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  margin: ${({margin}) => margin};
  ${({padding}) => borderBox(padding)};
  ${({fs,fw,color,lh,textAlign}) => textProps(fs,fw,color,lh,textAlign)};
  ${({addstyle}) => addstyle};
`;

export default MainTitleStyle;
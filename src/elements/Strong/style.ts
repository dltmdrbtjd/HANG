import styled from 'styled-components';
// mixin
import { textProps } from 'src/styles/Mixin';

export interface Prop {
  margin?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  addstyle?: any;
  theme: {
    [propName: string]: any;
  }
}

const StrongStyle = styled.strong<Prop>`
  margin: ${({margin}) => margin};
  ${({fs,fw,color,lh,textAlign}) => textProps(fs,fw,color,lh,textAlign)};
  ${({addstyle}) => addstyle};
`;

export default StrongStyle;
import styled from 'styled-components';
// mixin
import { borderBox,textProps, addTextSettings } from 'src/styles/Mixin';

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
  ls?: string;
  wb?: string;
  ws?: string;
  addstyle?: any;
}

const TextStyle = styled.p`
  width: ${({width}) => width};
  height: ${({height}) => height};
  margin: ${({margin}) => margin};
  ${({padding}) => borderBox(padding)};
  ${({fs,fw,color,lh,textAlign}) => textProps(fs,fw,color,lh,textAlign)};
  ${({ls,wb,ws}) => addTextSettings(ls,wb,ws)};
  ${({addstyle}) => addstyle};
`;

export default TextStyle;
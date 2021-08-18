import styled from 'styled-components';
// mixin
import { borderBox, textProps, floatBox } from 'src/styles/Mixin';

export interface Prop {
  fw?: string;
  fs?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  margin?: string;
  width?: string;
  height?: string;
  padding?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  z?: string;
  addstyle?: any;
}

const LabelStyle = styled.label<Prop>`
  ${({ fs, fw, color, lh, textAlign }) =>
    textProps(fs, fw, color, lh, textAlign)};
  margin: ${({ margin }) => margin};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  ${({ padding }) => borderBox(padding)};
  ${({ position, top, right, bottom, left, z }) =>
    floatBox(position, top, right, bottom, left, z)};
  ${({ addstyle }) => addstyle};
`;

export default LabelStyle;

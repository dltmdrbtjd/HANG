import styled, { css } from 'styled-components';
// mixin
import { flexBox, textProps, borderBox, floatBox } from '../../styles/Mixin';

export interface Prop {
  isFlex?: boolean;
  hoz?: string;
  ver?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  border?: string;
  overflow?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  z?: string;
  shadow?: string;
  translate?: string;
  theme: {
    [propName: string]: any;
  };
}

const makeItFlexBox = css<Prop>`
  ${({ hoz, ver }) => flexBox(hoz, ver)};
`;

const UlStyle = styled.ul<Prop>`
  ${({ isFlex }) => isFlex && makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: ${({ overflow }) => overflow};
  margin: ${({ margin }) => margin};
  border-radius: ${({ radius }) => radius};
  box-shadow: ${({ shadow }) => shadow};
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  border: ${({ border }) => border};
  ${({ padding }) => borderBox(padding)};
  ${({ fs, fw, color, lh, textAlign }) =>
    textProps(fs, fw, color, lh, textAlign)};
  ${({ position, top, right, bottom, left, z }) =>
    floatBox(position, top, right, bottom, left, z)};

  ${({ addstyle }) => addstyle};
`;

export default UlStyle;

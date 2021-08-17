import styled, { css } from 'styled-components';
// mixin
import {
  flexBox,
  floatBox,
  borderBox,
  textProps,
  outlineBox,
} from '../../styles/Mixin';

export interface Prop {
  isFlex?: string;
  hoz?: string;
  ver?: string;
  column?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  overflow?: string;
  padding?: string;
  border?: string;
  borDirection?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  testAlign?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  z?: string;
  shadow?: string;
  translate?: string;
  cursor?: string;
  addstyle?: any;
  theme: {
    [propName: string]: any;
  };
}

const makeItFlexBox = css`
  ${({ hoz, ver, column }) => css`
    ${flexBox(hoz, ver)};
    ${column && 'flex-direction: column'};
  `}
`;

const GridStyle = styled.div<Prop>`
  ${({ isFlex }) => isFlex && makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
  border-radius: ${({ radius }) => radius};
  overflow: ${({ overflow }) => overflow};
  box-shadow: ${({ shadow }) => shadow};
  cursor: ${({ cursor }) => cursor};
  transform: translate(${({ translate }) => translate});
  ${({ padding }) => borderBox(padding)};
  ${({ fs, fw, color, lh, textAlign }) =>
    textProps(fs, fw, color, lh, textAlign)};
  ${({ border, borDirection }) => outlineBox(border, borDirection)};
  ${({ position, top, right, bottom, left, z }) =>
    floatBox(position, top, right, bottom, left, z)};

  ${({ addstyle }) => addstyle};
`;

export default GridStyle;

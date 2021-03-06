import styled, { css } from 'styled-components';
// mixin
import { flexBox, borderBox } from '../../styles/Mixin';

export interface Prop {
  isFlex?: boolean;
  hoz?: string;
  ver?: string;
  width?: string;
  height?: string;
  radius?: string;
  bgColor?: string;
  fs?: string;
  textAlign?: string;
  padding?: string;
  addstyle?: any;
  theme: {
    [propName: string]: any;
  };
}

const makeItFlexBox = css<Prop>`
  ${({ hoz, ver }) =>
    css`
      ${flexBox(hoz, ver)};
    `}
`;

const ListStyle = styled.li<Prop>`
  ${({ isFlex }) => isFlex && makeItFlexBox};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius};
  background-color: ${({ bgColor }) => bgColor};
  font-size: ${({ fs, theme }) => theme.fontSize[fs]};
  text-align: ${({ textAlign }) => textAlign};
  cursor: pointer;
  ${({ padding }) => borderBox(padding)};

  ${({ addstyle }) => addstyle};
`;

export default ListStyle;

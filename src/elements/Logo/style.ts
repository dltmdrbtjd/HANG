import styled, { css } from 'styled-components';
// mixin
import { floatBox, flexBox } from '../../styles/Mixin';

export interface Prop {
  width?: string;
  height?: string;
  imgUrl?: string;
  theme: {
    [propName: string]: any;
  };
}

const LogoStyle = styled.h1<Prop>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  ${floatBox('absolute', 0, 0, 0, 0, -1)};
  ${flexBox('center', 'center')};
  margin: auto;

  ${({ imgUrl }) =>
    imgUrl &&
    css`
      background-image: url(${imgUrl});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      text-indent: -9999px;
    `}
`;

export default LogoStyle;

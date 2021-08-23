import { css } from 'styled-components';
// mixin
import { flexBox } from '../Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

export const setTabletCardLayout = (size = 'tablet') => {
  return css<Prop>`
    ${({ theme }) => theme.media[size]`
    ${flexBox('space-between', null)};
    flex-wrap: wrap;
  
    & > div {
      width: 49%;
    }
  `};
  `;
};

export const setTabletFontSize = (fontSize: string, size = 'tablet') => {
  return css<Prop>`
    ${({ theme }) => theme.media[size]`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
  `};
  `;
};

export const setTabletBoxSize = (
  width: string | null,
  height: string | null,
  size = 'tablet',
) => {
  return css`
    ${({ theme }) => theme.media[size]`
    width: ${width};
    height: ${height};
  `};
  `;
};

export const setTabletLimitBoxSize = (maxWidth: string, size = 'tablet') => {
  return css`
    ${({ theme }) => theme.media[size]`
    max-width: ${maxWidth};
  `};
  `;
};

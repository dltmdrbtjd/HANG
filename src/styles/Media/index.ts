import { css } from 'styled-components';
// mixin
import { flexBox } from '../Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

export const setMediaCardLayout = (size = 'tablet') => {
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

export const setMediaFontSize = (fontSize: string, size = 'tablet') => {
  return css<Prop>`
    ${({ theme }) => theme.media[size]`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
  `};
  `;
};

export const setMediaBoxSize = (
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

export const setMediaLimitBoxSize = (maxWidth: string, size = 'tablet') => {
  return css`
    ${({ theme }) => theme.media[size]`
    max-width: ${maxWidth};
  `};
  `;
};

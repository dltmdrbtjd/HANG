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
    @media ${({ theme }) => theme.deviceSize[size]} {
      ${flexBox('space-between', null)};
      flex-wrap: wrap;

      & > div {
        width: 49%;
      }
    }
  `;
};

export const setMediaFontSize = (fontSize: string, size = 'tablet') => {
  return css<Prop>`
    @media ${({ theme }) => theme.deviceSize[size]} {
      font-size: ${({ theme }) => theme.fontSize[fontSize]};
    }
  `;
};

export const setMediaBoxSize = (
  width: string | null,
  height: string | null,
  size = 'tablet',
) => {
  return css`
    @media ${({ theme }) => theme.deviceSize[size]} {
      width: ${width};
      height: ${height};
    }
  `;
};

export const setMediaLimitBoxSize = (maxWidth: string, size = 'tablet') => {
  return css`
    @media ${({ theme }) => theme.deviceSize[size]} {
      max-width: ${maxWidth};
    }
  `;
};

export const setMediaMargin = (margin: string, size = 'tablet') => {
  return css`
    @media ${({ theme }) => theme.deviceSize[size]} {
      margin: ${margin};
    }
  `;
};

import { css } from 'styled-components';
// mixin
import { flexBox } from '../Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

export const setTabletCardLayout = css`
  ${flexBox('space-between', null)};
  flex-wrap: wrap;

  & > div {
    width: 49%;
  }
`;

export const setTabletFontSize = (fontSize: string) => {
  return css<Prop>`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
  `;
};

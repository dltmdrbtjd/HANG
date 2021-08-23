import { css } from 'styled-components';
// mixin
import { textOverflow, flexBox } from '../../../styles/Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const SubTitleTextHidden = (width = '140px') => {
  return css`
    display: inline-block;
    max-width: ${width};
    ${textOverflow()};
  `;
};

export const setNicknameFont = css<Prop>`
  ${SubTitleTextHidden()};

  ${({ theme }) => theme.media.tablet`
    max-width: none
  `};
`;

export const setSubTitleFont = css`
  ${flexBox(null, 'center')};

  ${({ theme }) => theme.media.mobile`
    font-size: ${theme.fontSize.md};
  `};
`;

export default SubTitleTextHidden;

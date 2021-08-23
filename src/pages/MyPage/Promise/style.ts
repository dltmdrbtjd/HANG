import { css } from 'styled-components';
// mixin
import { flexBox } from '../../../styles/Mixin';
import SubTitleTextHidden from '../MyInfo/style';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const setTabletWrapper = css<Prop>`
  @media ${({ theme }) => theme.deviceSize.tablet} {
    overflow: auto;

    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.color.bgColor};
      border-radius: 15px;
      opacity: 0;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.color.lightGray};
    }
  }
`;

const setTabletPromiseCard = (length: number) => {
  return css<Prop>`
    @media ${({ theme }) => theme.deviceSize.tablet} {
      width: ${432 * length}px;

      & > div {
        width: 420px;
        margin-right: 12px;
        float: left;
      }

      &::after {
        display: block;
        clear: both;
        content: '';
      }
    }
  `;
};

const TextVerticalAlignCenter = css`
  ${flexBox(null, 'center')};
  flex-wrap: wrap;
`;

const setNicknameFont = css<Prop>`
  ${SubTitleTextHidden('160px')};

  @media ${({ theme }) => theme.deviceSize.tablet} {
    ${SubTitleTextHidden('120px')};
  }

  @media ${({ theme }) => theme.deviceSize.mobile} {
    ${SubTitleTextHidden('120px')};
  }
`;

export {
  setTabletWrapper,
  setTabletPromiseCard,
  TextVerticalAlignCenter,
  setNicknameFont,
};

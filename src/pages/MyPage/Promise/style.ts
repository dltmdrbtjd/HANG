import { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const setTabletWrapper = css<Prop>`
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
`;

const setTabletPromiseCard = (length: number) => {
  return css`
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
  `;
};

export { setTabletWrapper, setTabletPromiseCard };

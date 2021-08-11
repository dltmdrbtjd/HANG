import { css } from 'styled-components';

const TabWrapper = css`
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
    background: ${({ theme }) => theme.color.semiLightG};
  }
`;

const TabLayout = css`
  width: ${props => `${432 * props.length}px`};

  &::after {
    display: block;
    clear: both;
    content: '';
  }
`;

const TabSize = css`
  width: 420px;
  margin-right: 12px;
  float: left;
`;

export { TabWrapper, TabLayout, TabSize };

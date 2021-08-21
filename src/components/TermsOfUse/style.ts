import {css} from 'styled-components';

const MaxHeight = css`
  max-height: 124px;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.color.OpacityGray};
    border-radius: 4px;
  }
`;

export default MaxHeight;
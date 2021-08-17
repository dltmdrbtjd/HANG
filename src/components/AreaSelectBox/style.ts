import {css} from 'styled-components';

const CityTab = css`
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.color.gray};
    border-radius: 6px;
  }

  .submenu {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .focused {
    background-color: ${({theme}) => theme.color.skyblue};
    border-radius: 30px;
  }
`;

export default CityTab;
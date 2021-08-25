import {css} from 'styled-components';

const CityTab = css`
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 22px;
    border-radius: 15px;
    background-color: rgba(0,0,0,0)
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.color.OpacityGray};
    width:5px;
    background-clip: padding-box;
    border-radius: 9999px;
    border: 5px rgba(0,0,0,0) solid;
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
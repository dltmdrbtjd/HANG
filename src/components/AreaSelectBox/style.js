import styled from 'styled-components';

const CityTab = styled.ul`
  background-color: ${({ theme }) => theme.color.bgColor};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 10px 35px 10px 20px;
  width: 49%;
  height: 185px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.gray};
    border-radius: 6px;
  }

  .submenu {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .focused {
    background-color: ${({ theme }) => theme.color.skyblue};
    border-radius: 30px;
  }
`;

export default CityTab;

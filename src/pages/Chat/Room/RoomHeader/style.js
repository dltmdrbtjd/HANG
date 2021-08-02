import styled from 'styled-components';

const RoomToggleWrapper = styled.ul`
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.semiLightG};
  box-sizing: border-box;
  position: absolute;
  top: 5px;
  right: 0;
`;

const RoomToggleList = styled.li`
  padding: 16px 30px;
  cursor: pointer;

  &:first-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.semiLightG};
  }
`;

export { RoomToggleWrapper, RoomToggleList };

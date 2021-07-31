import styled from 'styled-components';

const NavigationStyle = styled.ul`
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 90px;
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  box-shadow: 0 -4px 4px rgba(134, 134, 134, 0.3);
  background-color: ${({ theme }) => theme.color.lightG};
  cursor: pointer;
`;

const Navigationicons = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &.Click,
  &.Click p {
    color: ${({ theme }) => theme.color.brandColor};
  }
`;

export { NavigationStyle, Navigationicons };

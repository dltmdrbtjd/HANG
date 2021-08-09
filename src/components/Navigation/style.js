import styled from 'styled-components';

const NavigationStyle = styled.ul`
  display: flex;
  position: fixed;
  width: 100%;
  max-width: 768px;
  left: 50%;
  bottom: 0;
  height: 90px;
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  cursor: pointer;
  transform: translateX(-50%);
  z-index: 3;
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

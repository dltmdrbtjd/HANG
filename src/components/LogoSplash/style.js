import styled from 'styled-components';

const SplashStyle = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 99;
  background-color: ${({ theme }) => theme.color.bgColor};
`;

export default SplashStyle;

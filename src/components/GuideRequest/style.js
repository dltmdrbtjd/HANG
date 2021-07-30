import styled from 'styled-components';

const GuideRequestStyle = styled.div`
  width: 100%;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.semiLightG};
  position: absolute;
  bottom: 0;
  border-radius: 14px 14px 0 0;
`;

const RadioBtn = styled.div`
  width: 100%;
`;

export { GuideRequestStyle, RadioBtn };

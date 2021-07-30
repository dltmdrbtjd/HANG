import styled from 'styled-components';

const BlurBoxStyle = styled.div`
  display: ${props => props.display};
  justify-content: ${props => props.hoz};
  align-items: ${props => props.ver};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(44, 44, 44, 0.7);
  backdrop-filter: blur(4px);
  z-index: 9;
`;

export default BlurBoxStyle;

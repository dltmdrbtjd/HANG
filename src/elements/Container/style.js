import styled from 'styled-components';

const ContainerStyle = styled.div`
  position: relative;
  padding: ${props => (props.isPadding || props.height ? 0 : '90px 0')};
  box-sizing: border-box;
  max-width: 768px;
  height: ${props => props.height};
  min-height: ${props => props.height || '100vh'};
  margin: 0 auto;

  @media only screen and (max-width: 768px) {
    max-width: none;
    width: 90%;
  }
`;

export default ContainerStyle;

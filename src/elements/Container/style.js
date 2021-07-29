import styled from 'styled-components';

const ContainerStyle = styled.div`
  position: relative;
  padding-top: ${props => (props.isPadding || props.height ? 0 : '90px')};
  box-sizing: border-box;
  max-width: 1024px;
  height: ${props => props.height};
  min-height: ${props => props.height || '100vh'};
  margin: 0 auto;

  @media only screen and (max-width: 424px) {
    max-width: none;
    width: 95%;
  }
`;

export default ContainerStyle;

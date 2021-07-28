import styled from 'styled-components';

const ContainerStyle = styled.div`
  position: relative;
  max-width: 1024px;
  margin: 0 auto;

  @media only screen and (min-width: 768px) {
    max-width: none;
    width: 95%;
  }
`;

export default ContainerStyle;

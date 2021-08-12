import styled from 'styled-components';
// mixin
import { borderBox } from '../../styles/Mixin';

const ContainerStyle = styled.div`
  position: relative;
  ${props => !props.noPadding && borderBox(props.padding)};
  max-width: 768px;
  height: ${props => props.height};
  min-height: ${props => props.height || '100vh'};
  margin: 0 auto;

  ${props => props.addstyle};

  @media only screen and (max-width: 800px) {
    max-width: none;
    width: 90%;
  }
`;

export default ContainerStyle;

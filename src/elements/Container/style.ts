import styled from 'styled-components';
// mixin
import { borderBox } from '../../styles/Mixin';

export interface Prop {
  padding: string;
  height: string;
  addstyle?: any;
}

const ContainerStyle = styled.div<Prop>`
  position: relative;
  max-width: 768px;
  height: ${({ height }) => height};
  min-height: ${({ height }) => height || '100vh'};
  margin: 0 auto;
  ${({ padding }) => borderBox(padding)};

  ${({ addstyle }) => addstyle};

  @media only screen and (max-width: 800px) {
    max-width: none;
    width: 90%;
  }
`;

export default ContainerStyle;

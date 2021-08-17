import { flexBox } from 'src/styles/Mixin';
import styled, {css} from 'styled-components';

export interface Prop {
  isFlex?: any;
  hoz?: string;
  ver?: string;
}

const makeItFlexBox = css<Prop>`
  ${({isFlex, hoz, ver}) => isFlex && flexBox(hoz,ver)};
`;

const BlurBoxStyle = styled.div`
  ${makeItFlexBox};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(44,44,44,0.7);
  backdrop-filter: blur(4px);
  z-index: 9;
`;

export default BlurBoxStyle;
import styled, { css } from 'styled-components';
// mixin
import { flexBox } from '../../styles/Mixin';

const makeItFlexBox = css`
  ${props => props.isFlex && flexBox(props.hoz, props.ver)};
`;

const BlurBoxStyle = styled.div`
  ${makeItFlexBox};
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

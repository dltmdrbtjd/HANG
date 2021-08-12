import { css } from 'styled-components';

const ArrowRotate = css`
  position: relative;
  z-index: 1;

  img {
    transition: 0.5s;
    transform: rotate(${({ angle }) => angle}deg);
  }
`;

export default ArrowRotate;

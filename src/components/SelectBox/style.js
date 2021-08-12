import { css } from 'styled-components';

const ArrowRotate = css`
  img {
    transition-duration: 0.5s;
    transform: rotate(${({ angle }) => angle}deg);
  }
`;

export default ArrowRotate;

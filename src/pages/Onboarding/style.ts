import { css } from 'styled-components';

const Transition = css`
  transition-duration: 0.5s;
`;

const CalcHeight = css`
  width: 100vw;
  height: calc(100vh - 70px);

  a {
    text-indent: -9999px;
    overflow: hidden;
    display: block;
  }
`;

export { Transition, CalcHeight };

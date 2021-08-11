import { css } from 'styled-components';

const Transition = css`
  transition-duration: 0.5s;
`;

const CalcHeight = css`
  width: 100vw;
  height: calc(100vh - 70px);
`;

const TabImage = css`
  width: 52%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
`;

const TabTitle = css`
  font-size: ${({ theme }) => theme.fontSize.tab};
`;

const TabText = css`
  font-size: ${({ theme }) => theme.fontSize.sxl};
`;

export { Transition, CalcHeight, TabImage, TabTitle, TabText };

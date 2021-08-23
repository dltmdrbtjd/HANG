import { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

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

const TabletImageSize = css<Prop>`
  ${({ theme }) => theme.media.tablet`
    width: 52%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `};
`;

export { Transition, CalcHeight, TabletImageSize };

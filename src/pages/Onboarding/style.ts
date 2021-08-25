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
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    height: 100%;
  }
`;

const PageMoveArrowStyle = css<Prop>`
  display: none;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    display: inline-block;
  }
`;

export { Transition, CalcHeight, PageMoveArrowStyle };

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
  @media ${({ theme }) => theme.deviceSize.tablet} {
    width: 52%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PageMoveArrowStyle = css<Prop>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: none;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    display: inline-block;
  }
`;

export { Transition, CalcHeight, TabletImageSize, PageMoveArrowStyle };

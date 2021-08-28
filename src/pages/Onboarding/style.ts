import { css } from 'styled-components';
// mixin
import { flexBox } from 'src/styles/Mixin';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const Transition = css`
  transition: left 0.5s;
`;

const CalcHeight = css`
  width: 100vw;
  height: calc(100vh - 70px);
`;

const OnboardingImageSize = css`
  max-height: 800px;

  a {
    text-indent: -9999px;
    overflow: hidden;
    height: 100%;
    cursor: grab;
    ${flexBox('center', 'center')};
  }

  img {
    object-fit: contain;
  }
`;

const PageMoveArrowStyle = css<Prop>`
  display: none;

  @media ${({ theme }) => theme.deviceSize.tablet} {
    display: inline-block;
  }
`;

export { Transition, CalcHeight, OnboardingImageSize, PageMoveArrowStyle };

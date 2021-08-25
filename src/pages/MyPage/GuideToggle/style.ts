import { css } from 'styled-components';
// mixin
import { flexBox } from 'src/styles/Mixin';

const FloatButton = css`
  position: relative;
  ${flexBox(null, 'center', 'inline-flex')};
`;

const ToggleLabelStyle = (checked: number) => {
  return css`
    transition: right, 0.5s;
    position: relative;
    left: ${checked ? '100%' : 0};
    transform: translateX(${checked ? '-30px' : 0});
  `;
};

const ToggleNameStyle = (checked: number) => {
  return css`
    position: absolute;
    ${checked ? 'left: 10px' : 'right: 10px'};
  `;
};

export { FloatButton, ToggleLabelStyle, ToggleNameStyle };

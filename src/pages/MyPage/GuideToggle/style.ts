import { css } from 'styled-components';

const FloatButton = css`
  position: relative;
`;

const ToggleLabelStyle = (checked: boolean) => {
  return css`
    transition: right, 0.5s;
    position: relative;
    left: ${checked ? '100%' : 0};
    transform: translateX(${checked ? '-30px' : 0});
  `;
};

const ToggleNameStyle = (checked: boolean) => {
  return css`
    position: absolute;
    ${checked ? 'left: 10px' : 'right: 10px'};
  `;
};

export { FloatButton, ToggleLabelStyle, ToggleNameStyle };

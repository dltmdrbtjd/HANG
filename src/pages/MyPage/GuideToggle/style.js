import { css } from 'styled-components';

const FloatButton = css`
  position: relative;
`;

const ToggleLabelStyle = css`
  transition: right, 0.5s;
  position: relative;
  left: ${props => (props.checked ? '100%' : 0)};
  transform: translateX(${props => (props.checked ? '-30px' : 0)});
`;

const ToggleNameStyle = css`
  position: absolute;
  ${({ checked }) => checked && 'left: 10px'};
  ${({ checked }) => checked || 'right: 10px'};
`;

export { FloatButton, ToggleLabelStyle, ToggleNameStyle };

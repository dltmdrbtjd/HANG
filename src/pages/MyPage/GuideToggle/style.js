import { css } from 'styled-components';

const ButtonStyle = css`
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
  left: ${props => (props.checked ? '9px' : '100%')};
  transform: translateX(${props => (props.checked ? 0 : '-30px')});
`;

export { ButtonStyle, ToggleLabelStyle, ToggleNameStyle };

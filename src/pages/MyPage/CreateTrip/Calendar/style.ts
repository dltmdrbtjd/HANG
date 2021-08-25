import { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

export const SetArrowAngle = (angle: number) => {
  return css`
    transition: 0.5s;
    transform: rotate(${angle}deg);
  `;
};

const CalendarSelectButtonStyle = css<Prop>`
  max-width: 380px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export default CalendarSelectButtonStyle;

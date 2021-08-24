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

  @media ${({ theme }) => theme.deviceSize.tablet} {
    padding: 13px 45px;

    & span:last-child {
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
`;

export default CalendarSelectButtonStyle;

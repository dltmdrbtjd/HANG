import { css } from 'styled-components';

const ArrowStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const SetTabFontSize = fontSize => {
  return css`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
  `;
};

const SmallMobileProfileSize = css`
  width: 70px;
  padding-bottom: 70px;
`;

export { ArrowStyle, SetTabFontSize, SmallMobileProfileSize };

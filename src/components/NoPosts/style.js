import { css } from 'styled-components';

const TabFontSize = fontSize => {
  return css`
    font-size: ${({ theme }) => theme.fontSize[fontSize]};
  `;
};

export default TabFontSize;

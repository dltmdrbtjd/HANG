import { css } from 'styled-components';

const TabTitle = css`
  font-size: ${({ theme }) => theme.fontSize.tab};
`;

const TabMargin = margin => {
  return css`
    margin-bottom: ${margin};
  `;
};

const TabWelcome = css`
  width: 80%;
  left: 50%;
  transform: translate(-50%, -40%);
`;

export { TabTitle, TabMargin, TabWelcome };

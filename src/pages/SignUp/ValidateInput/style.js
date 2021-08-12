import { css } from 'styled-components';

const setSpanWithStatus = status => {
  switch (status) {
    case 'danger':
      return css`
        color: ${({ theme }) => theme.color.danger};
      `;

    case 'safe':
      return css`
        color: ${({ theme }) => theme.color.safe};
      `;

    default:
      return null;
  }
};

const setGridWithStatus = status => {
  switch (status) {
    case 'danger':
      return css`
        padding-right: 12px;
        border: 1px solid ${({ theme }) => theme.color.danger};
      `;

    case 'safe':
      return css`
        padding-right: 12px;
        border: 1px solid ${({ theme }) => theme.color.safe};
      `;

    default:
      return css`
        border: 1px solid ${({ theme }) => theme.color.semiLightG};
      `;
  }
};

const setInputWithStatus = status => {
  if (status) {
    return css`
      width: 90%;
      padding: 0 0 0 12px;
    `;
  }
};

export { setGridWithStatus, setInputWithStatus, setSpanWithStatus };

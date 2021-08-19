import styled, { css } from 'styled-components';

interface Prop {
  theme: {
    [propName: string]: any;
  };
}

const setSpanWithStatus = (status: string) => {
  switch (status) {
    case 'danger':
      return css<Prop>`
        color: ${({ theme }) => theme.color.danger};
      `;

    case 'safe':
      return css<Prop>`
        color: ${({ theme }) => theme.color.safe};
      `;

    default:
      return null;
  }
};

const setGridWithStatus = (status: string) => {
  switch (status) {
    case 'danger':
      return css<Prop>`
        border: 1px solid ${({ theme }) => theme.color.danger};
      `;

    case 'safe':
      return css<Prop>`
        border: 1px solid ${({ theme }) => theme.color.safe};
      `;

    default:
      return css<Prop>`
        border: 1px solid ${({ theme }) => theme.color.semiLightG};
      `;
  }
};

const InputInitialized = styled.input`
  width: calc(100% - 30px);
  border: none;
  background: none;
  padding: 0;
`;

export { setGridWithStatus, setSpanWithStatus, InputInitialized };

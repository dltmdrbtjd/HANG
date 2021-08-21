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
        border: 1px solid ${({ theme }) => theme.color.lightGray};
      `;
  }
};

const InputInitialized = styled.input`
  width: calc(100% - 30px);
  border: none;
  background: none;
  padding: 0;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.gray};
  }

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.color.gray};
  }

  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.color.gray};
  }
`;

export { setGridWithStatus, setSpanWithStatus, InputInitialized };

import styled, { css } from 'styled-components';

interface Prop {
  theme: {
    [PropName: string]: any;
  }
}

const RadioBtn = styled.input<Prop>`
  &[type='radio'],
  &[type='radio']:checked {
    width: 20px;
    height: 20px;
    border-radius: 30px;
    cursor: pointer;
    margin-right: 22px;
  }

  &[type='radio'] {
    background-color: ${({ theme }) => theme.color.white};
    border: 5px solid ${({ theme }) => theme.color.lightGray};
  }

  &[type='radio']:checked {
    background-color: ${({ theme }) => theme.color.brandColor};
  }
`;

const maxWidth = css`
  max-width: 600px;
`;

export { maxWidth, RadioBtn };
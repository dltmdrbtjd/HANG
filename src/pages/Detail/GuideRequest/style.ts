import styled, { css } from 'styled-components';

interface Prop {
  theme: {
    [PropName: string]: any;
  }
}

const RadioBtn = styled.input<Prop>`
  &[type='radio'],
  &[type='radio']:checked {
    width: 30px;
    height: 30px;
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
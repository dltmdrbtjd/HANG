import styled from 'styled-components';

export interface Prop {
  width?: string;
  height?: string;
  weight?: string;
  marginRight?: string;
  theme: {
    [propName: string]: any;
  };
}

const RadioStyle = styled.input<Prop>`
  &[type='radio'],
  &[type='radio']:checked {
    appearance: none;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    margin-right: ${({ marginRight }) => marginRight};
    border-radius: 50%;
    cursor: pointer;
  }

  &[type='radio'] {
    background-color: ${({ theme }) => theme.color.white};
    border: ${({ weight, theme }) =>
      `${weight} solid ${theme.color.lightGray}`};
  }
  &[type='radio']:checked {
    background-color: ${({ theme }) => theme.color.brandColor};
  }
`;

export default RadioStyle;

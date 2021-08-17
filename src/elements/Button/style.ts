import styled, { css } from 'styled-components';
// mixin
import { borderBox } from '../../styles/Mixin';

export interface Prop {
  form?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  disColor?: string;
  shadow?: string;
  theme: {
    [propName: string]: any;
  };
}

const buttonShapeSetting = (form: string) => {
  switch (form) {
    case 'text':
      return css`
        background: none;
        padding: 0;
        color: ${({ color, theme }) => color && theme.color[color]};
      `;

    default:
      return css`
        background-color: ${({ bgColor, theme }) => theme.color[bgColor]};
        color: ${({ color, theme }) =>
          color ? theme.color[color] : theme.color.white};
        ${({ padding }) => borderBox(padding)};
      `;
  }
};

const ButtonStyle = styled.button<Prop>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
  box-shadow: ${({ shadow }) => shadow};
  border-radius: ${({ radius }) => radius};
  cursor: pointer;
  border: none;
  font-size: ${({ fs, theme }) => fs && theme.fontSize[fs]};
  font-weight: ${({ fw, theme }) => fw && theme.fontWeight[fw]};
  ${({ form }) => buttonShapeSetting(form)};

  ${({ addstyle }) => addstyle};

  &:disabled {
    background-color: ${({ disColor, theme }) => theme.color[disColor]};
  }
`;

export default ButtonStyle;

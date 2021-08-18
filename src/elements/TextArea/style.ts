import styled from 'styled-components';
// mixin
import { borderBox } from 'src/styles/Mixin';

export interface Prop {
  radius?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fs?: string;
  padding?: string;
  border?: string;
  addstyle?: string;
  theme: {
    [propName: string]: any;
  };
}

const TextAreaStyle = styled.textarea<Prop>`
  border-radius: ${({ radius }) => radius};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme, bgColor }) => theme.color[bgColor]};
  color: ${({ theme, color }) => theme.color[color]};
  font-size: ${({ theme, fs }) => theme.fontSize[fs]};
  resize: none;
  ${({ padding }) => borderBox(padding)};
  border: ${({ border }) => border};

  &:focus {
    outline: none;
  }

  ${({ addstyle }) => addstyle};
`;

export default TextAreaStyle;

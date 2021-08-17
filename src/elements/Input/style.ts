import styled from 'styled-components';
import { borderBox } from 'src/styles/Mixin';

export interface Prop {
  border?: string;
  radius?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  color?: string;
  fs?: string;
  shadow?: string;
  padding?: string;
  addstyle?: any;
  theme: {
    [propName: string]: any;
  };
}

const InputStyle = styled.input<Prop>`
  border: ${({border}) => border};
  background: none;
  border-radius: ${({radius}) => radius};
  width: ${({width}) => width};
  height: ${({height}) => height};
  background-color: ${({bgColor, theme}) => theme.color[bgColor]};
  color:${({color, theme}) => theme.color[color]};
  font-size:${({fs, theme}) => fs && theme.fontSize[fs]};
  box-shadow: ${({shadow}) => shadow};
  ${({padding}) => borderBox(padding)};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({theme}) => theme.color.gray};
  }

  &::-webkit-input-placeholder {
    color: ${({theme}) => theme.color.gray};
  }

  &::-ms-input-placeholder {
    color: ${({theme}) => theme.color.gray};
  }

  ${({addstyle}) => addstyle};

`;

export default InputStyle;
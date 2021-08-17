import styled from 'styled-components';

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
  theme: {
    [propName: string]: any;
  };
}


const InputStyle = styled.input<Prop>`
  border: ${({border}) => (border)};
  background: none;
  border-radius: ${({radius}) => (radius)};
  width: ${({width}) => (width)};
  height: ${({height}) => (height)};
  background-color: ${({bgColor}) => (bgColor)};
  color:${({color}) => (color)};
  font-size:${({fs}) => (fs)};
  box-shadow: ${({shadow}) => (shadow)};
  ${({padding}) => (padding)};
`;

export default InputStyle;
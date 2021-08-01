import styled from 'styled-components';

const InputStyle = styled.input`
  border: ${props => props.border};
  background: none;
  border-radius: ${props => props.radius};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  background-color: ${props => props.theme.color[props.bgColor]};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  box-shadow: ${props => props.shadow};
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.color.gray};
  }

  &::-webkit-input-placeholder {
    color: ${props => props.theme.color.gray};
  }

  &:-ms-input-placeholder {
    color: ${props => props.theme.color.gray};
  }
`;

export default InputStyle;

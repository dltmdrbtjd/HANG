import styled from 'styled-components';

const TextAreaStyle = styled.textarea`
  border: none;
  border-radius: ${props => props.radius};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  background-color: ${props => props.theme.color[props.bgColor]};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  box-sizing: border-box;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export default TextAreaStyle;

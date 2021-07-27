import styled from 'styled-components';

const ButtonStyle = styled.button`
  background-color: ${props => props.theme.color[props.bgColor]};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: ${props => props.padding};
  margin: ${props => props.margin};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  font-weight: ${props => props.fw};
  box-shadow: ${props => props.shadow};
  border: none;
  border-radius: ${props => props.radius};
  box-sizing: border-box;
  cursor: pointer;
`;

export default ButtonStyle;

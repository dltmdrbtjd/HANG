import styled from 'styled-components';
// mixin
import { borderBox, outlineBox } from '../../styles/Mixin';

const TextAreaStyle = styled.textarea`
  border-radius: ${props => props.radius};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.theme.color[props.bgColor]};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  resize: none;
  ${props => borderBox(props.padding)};
  ${props => outlineBox(props.border)};

  &:focus {
    outline: none;
  }

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default TextAreaStyle;

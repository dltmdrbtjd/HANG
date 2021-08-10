import styled from 'styled-components';
// mixin
import { borderBox } from '../../styles/Mixin';

const InputStyle = styled.input`
  border: ${props => props.border};
  background: none;
  border-radius: ${props => props.radius};
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: ${props => props.theme.color[props.bgColor]};
  color: ${props => props.theme.color[props.color]};
  font-size: ${props => props.theme.fontSize[props.fs]};
  box-shadow: ${props => props.shadow};
  ${props => borderBox(props.padding)};

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

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default InputStyle;

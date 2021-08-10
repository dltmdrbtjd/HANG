import styled from 'styled-components';
// mixin
import { borderBox, textProps, addTextSettings } from '../../styles/Mixin';

const TextStyle = styled.p`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  ${props => borderBox(props.padding)};
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};
  ${props => addTextSettings(props.ls, props.wb, props.ws)};

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default TextStyle;

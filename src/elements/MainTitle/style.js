import styled from 'styled-components';
// mixin
import { borderBox, textProps } from '../../styles/Mixin';

const MainTitleStyle = styled.h2`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  word-break: keep-all;
  letter-spacing: ${props => props.ls};
  ${props => borderBox(props.padding)};
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default MainTitleStyle;

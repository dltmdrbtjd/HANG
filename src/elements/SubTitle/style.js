import styled from 'styled-components';
// mixin
import { borderBox, textProps } from '../../styles/Mixin';

const SubTitleStyle = styled.h3`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  ${props => borderBox(props.padding)};
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default SubTitleStyle;

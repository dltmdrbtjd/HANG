import styled from 'styled-components';
// minxin
import { borderBox, textProps, floatBox } from '../../styles/Mixin';

const LabelStyle = styled.label`
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};
  margin: ${props => props.margin};
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => borderBox(props.padding)};
  ${props =>
    floatBox(
      props.position,
      props.top,
      props.right,
      props.bottom,
      props.left,
      props.z,
    )};

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default LabelStyle;

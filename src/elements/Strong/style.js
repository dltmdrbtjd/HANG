import styled from 'styled-components';
// mixin
import { textProps } from '../../styles/Mixin';

const StrongStyle = styled.strong`
  margin: ${props => props.margin};
  ${props =>
    textProps(props.fs, props.fw, props.color, props.lh, props.textAlign)};

  ${props => props.addstyle};

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default StrongStyle;

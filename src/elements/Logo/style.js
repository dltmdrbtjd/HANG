import styled from 'styled-components';
// mixin
import { floatBox } from '../../styles/Mixin';

const LogoStyle = styled.h1`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${floatBox('absolute', 0, 0, 0, 0)};
  margin: auto;

  button {
    text-indent: -9999px;
    overflow: hidden;
  }

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default LogoStyle;

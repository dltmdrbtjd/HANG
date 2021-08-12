import styled, { css } from 'styled-components';
// mixin
import { floatBox } from '../../styles/Mixin';

const LogoStyle = styled.h1`
  width: ${props => props.width};
  height: ${props => props.height};
  ${floatBox('absolute', 0, 0, 0, 0)};
  margin: auto;

  ${props =>
    props.imgUrl &&
    css`
      background-image: url(${props.imgUrl});
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      text-indent: -9999px;
    `}

  @media ${({ theme }) => theme.deviceSize.tab} {
    ${props => props.tab};
  }
`;

export default LogoStyle;

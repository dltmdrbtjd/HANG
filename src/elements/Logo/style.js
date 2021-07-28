import styled from 'styled-components';

const LogoStyle = styled.h1`
  text-indent: -9999px;
  overflow: hidden;
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export default LogoStyle;

import styled from 'styled-components';

const LogoStyle = styled.h1`
  width: ${props => props.width};
  height: ${props => props.height};
  background-image: url(${props => props.imgUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;

  button {
    text-indent: -9999px;
    overflow: hidden;
  }
`;

export default LogoStyle;

import styled from 'styled-components';

const ImageStyle = styled.img`
  display: block;
  width: ${props => props.width};
  height: ${props => props.height};
  object-fit: cover;

  ${props => props.addstyle};
`;

export default ImageStyle;

import styled from 'styled-components';

const ImageStyle = styled.img`
  display: block;
  width: ${props => props.width};
  object-fit: cover;
  border-radius: ${props => props.radius};
`;

export default ImageStyle;

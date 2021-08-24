import styled from 'styled-components';

export interface Prop {
  width?: string;
  height?: string;
  addstyle?: any;
}

const ImageStyle = styled.img<Prop>`
  display: block;
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  ${({ addstyle }) => addstyle};
`;

export default ImageStyle;

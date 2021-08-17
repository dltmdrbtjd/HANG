import React from 'react';
import ImageStyle from './style';

export interface Props {
  width: string;
  height: string;
  addstyle?: any;
  src: string;
  alt: string;
}

const Image: React.FC<Props> = ({ src, alt, ...props }) => {
  if (!src) return null;

  return <ImageStyle src={src} alt={alt} {...props} />;
};

Image.defaultProps = {
  width: '100%',
  height: '100%',
};

export default Image;

import React from 'react';
import ImageStyle from './style';

const Image = ({ src, alt, ...props }) => {
  if (!src) return null;

  return <ImageStyle src={src} alt={alt} {...props} />;
};

Image.defaultProps = {
  width: '100%',
};

export default Image;

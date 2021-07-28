import React from 'react';
import ImageStyle from './style';

const SubTitle = ({ src, alt, ...props }) => {
  if (!src) return null;

  return <ImageStyle src={src} alt={alt} {...props} />;
};

SubTitle.defaultProps = {
  width: '100%',
};

export default SubTitle;

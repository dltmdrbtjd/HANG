import React from 'react';
import ImageStyle from './style';

export interface Props {
  width?: string;
  height?: string;
  addstyle?: any;
  src?: string;
  alt?: string;
  _onLoad?: () => void;
}

const Image: React.FC<Props> = ({
  src,
  alt,
  _onLoad,
  ...props
}): React.ReactElement => {
  return <ImageStyle src={src} alt={alt} onLoad={_onLoad} {...props} />;
};

Image.defaultProps = {
  width: '100%',
  _onLoad: () => {},
};

export default Image;

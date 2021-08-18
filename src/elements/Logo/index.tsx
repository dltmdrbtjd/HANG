import React from 'react';
// style
import LogoStyle from './style';

export interface Props {
  width?: string;
  height?: string;
  imgUrl?: string;
  children?: React.ReactElement | string;
}

const Logo: React.FC<Props> = ({ children, ...props }): React.ReactElement => {
  return <LogoStyle {...props}>{children}</LogoStyle>;
};

export default Logo;

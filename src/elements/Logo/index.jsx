import React from 'react';
// style
import LogoStyle from './style';

const Logo = ({ children, ...props }) => {
  return <LogoStyle {...props}>{children}</LogoStyle>;
};

export default Logo;

import React from 'react';
import LogoStyle from './style';
// components
import Link from '../Link/index';
// images
import LogoImg from '../../Images/Symbol.png';

const Logo = props => {
  return (
    <LogoStyle {...props}>
      <Link href="/" width="100%" height="100%">
        Hang
      </Link>
    </LogoStyle>
  );
};

Logo.defaultProps = {
  imgUrl: LogoImg,
};

export default Logo;

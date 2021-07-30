import React, { useEffect } from 'react';
// elements
import { Logo } from '../../elements';
// images
import LogoImg from '../../Images/Logo.png';
// style
import SplashStyle from './style';

const LogoSplash = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <SplashStyle>
      <Logo width="169px" height="162px" imgUrl={LogoImg} />
    </SplashStyle>
  );
};

export default LogoSplash;

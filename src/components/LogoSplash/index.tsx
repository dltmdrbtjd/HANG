import React from 'react';
// elements
import { Logo, Grid } from '../../elements';

const LogoSplash = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Grid
      width="100vw"
      height="100vh"
      position="flxed"
      top="0"
      left="0"
      z="99"
      bgColor="bgColor"
    >
      <Logo
        width="169px"
        height="162px"
        imgUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/Logo.png"
      />
    </Grid>
  );
};

export default LogoSplash;

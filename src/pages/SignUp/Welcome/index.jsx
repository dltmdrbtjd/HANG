import React from 'react';
// elements
import { Grid, Link, Image } from '../../../elements';
// images
import WelcomeImg from '../../../Images/onboarding last page.gif';

const Welcome = () => {
  return (
    <>
      <Grid
        position="absolute"
        top="50%"
        left="0"
        translate="0, -50%"
        overflow="hidden"
        display="flex"
        hoz="center"
        ver="center"
      >
        <Image width="140%" src={WelcomeImg} />
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Link
          href="/"
          bgcolor="brandColor"
          fs="la"
          fw="bold"
          width="100%"
          padding="12px 0"
          color="white"
          hoz="center"
          radius="14px"
          shadow="0 4px 4px rgba(134,134,134,0.3)"
        >
          시작하기
        </Link>
      </Grid>
    </>
  );
};

Welcome.defaultProps = {};

export default Welcome;

import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Button, Image, MainTitle } from '../../../elements';
// components
import StatusBar from '../StatusBar';
// images
import WelcomeImg from '../../../Images/welcome.gif';

const Welcome = () => {
  return (
    <>
      <StatusBar curPage={4} />

      <MainTitle fs="xl" fw="extraBold" ls="-1px" margin="0 0 30px">
        당신만의&nbsp;행복한&nbsp;여행이 시작됩니다!
      </MainTitle>

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
        <Button
          fs="la"
          fw="bold"
          width="100%"
          _onClick={() => {
            history.push('/login');
          }}
        >
          시작하기
        </Button>
      </Grid>
    </>
  );
};

Welcome.defaultProps = {};

export default Welcome;

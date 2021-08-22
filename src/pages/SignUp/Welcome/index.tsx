import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Button, Image } from '../../../elements';
// images
import WelcomeImg from '../../../Images/welcome.gif';
// style
import TextHidden from './style';

const Welcome = (): React.ReactElement => {
  return (
    <>
      <Grid
        position="absolute"
        top="50%"
        left="0"
        translate="0, -40%"
        overflow="hidden"
        addstyle={TextHidden}
      >
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.freepik.com/vectors/people"
        >
          People vector created by freepik - www.freepik.com
          <Image width="140%" src={WelcomeImg} />
        </a>
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Button
          fs="la"
          fw="bold"
          width="100%"
          _onClick={() => history.push('/login')}
        >
          시작하기
        </Button>
      </Grid>
    </>
  );
};

export default Welcome;

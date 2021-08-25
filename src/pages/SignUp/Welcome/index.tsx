import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, Button, Image, MainTitle } from '../../../elements';
// images
import WelcomeImg from '../../../Images/welcome.gif';
// style
import TextHidden from './style';
import { limitWidth } from '../../../styles/Mixin';

const Welcome = (): React.ReactElement => {
  return (
    <Grid height="calc(100vh - 76px)">
      <MainTitle fs="xl" fw="extraBold" margin="0 0 40px">
        당신만의 행복한 여행이
        <br />
        시작됩니다!
      </MainTitle>

      <Grid addstyle={TextHidden}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.freepik.com/vectors/people"
        >
          People vector created by freepik - www.freepik.com
          <Image
            width="auto"
            height="100%"
            addstyle={limitWidth('140%')}
            src={WelcomeImg}
          />
        </a>
      </Grid>

      <Button
        fs="la"
        fw="bold"
        width="100%"
        margin="30px 0 20px"
        _onClick={() => history.push('/signin')}
      >
        시작하기
      </Button>
    </Grid>
  );
};

export default Welcome;

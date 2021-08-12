import React from 'react';
// history
import { history } from '../../../redux/configureStore';
// elements
import {
  MainTitle,
  Text,
  Strong,
  Image,
  Grid,
  Button,
  Container,
} from '../../../elements';
// images
import OnboardingImg3 from '../../../Images/onboarding3.svg';
// style
import { CalcHeight, TabImage, TabTitle, TabText } from '../style';

const Page3 = () => {
  return (
    <Grid position="relative" addstyle={CalcHeight}>
      <Container padding="0" height="100%">
        <MainTitle fs="xxl" fw="black" margin="0 0 30px" tab={TabTitle}>
          <Strong color="brandColor">행</Strong>
          복하게, 여<Strong color="brandColor">행</Strong>
          하라
        </MainTitle>

        <Text fs="lg" wb="keep-all" tab={TabText}>
          당신만의 행복한 여행을 만들러 갈까요?
        </Text>

        <Grid position="absolute" top="28%" left="0" tab={TabImage}>
          <Image src={OnboardingImg3} />
        </Grid>

        <Grid position="absolute" bottom="20px" left="0">
          <Button
            fs="la"
            width="100%"
            _onClick={() => history.push('/signup')}
            margin="0 0 8px"
          >
            회원가입
          </Button>

          <Button
            fs="sm"
            fw="regular"
            color="darkG"
            bgColor="bgColor"
            width="100%"
            _onClick={() => history.push('/login')}
          >
            로그인
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page3;

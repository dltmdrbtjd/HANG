import React from 'react';
// history
import TermsOfUse from 'src/components/TermsOfUse';
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
import { CalcHeight } from '../style';
import { setMediaFontSize } from '../../../styles/Media';
import { limitWidth } from '../../../styles/Mixin';

const Page3 = () => {
  const [terms, setTerms] = React.useState<boolean>(false);

  return (
    <Grid position="relative" addstyle={CalcHeight}>
      <Container padding="0" height="100%">
        <MainTitle fs="xxl" fw="black" addstyle={setMediaFontSize('tab')}>
          <Strong color="brandColor">행</Strong>
          복하게, 여<Strong color="brandColor">행</Strong>
          하라
        </MainTitle>

        <Text
          fs="lg"
          wb="keep-all"
          margin="0 0 30px"
          addstyle={setMediaFontSize('sxl')}
        >
          당신만의 행복한 여행을 만들러 갈까요?
        </Text>

        <Grid height="calc(100% - 260px)" margin="30px 0">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/people"
          >
            People vector created by stories - www.freepik.com
            <Image
              width="auto"
              height="100%"
              addstyle={limitWidth('100%')}
              src={OnboardingImg3}
            />
          </a>
        </Grid>

        <Button
          fs="la"
          width="100%"
          _onClick={() => setTerms(true)}
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
          _onClick={() => history.push('/signin')}
        >
          로그인
        </Button>
        {terms && <TermsOfUse setTerms={setTerms} />}
      </Container>
    </Grid>
  );
};

export default Page3;

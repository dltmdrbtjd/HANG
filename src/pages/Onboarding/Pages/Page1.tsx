import React from 'react';
// elements
import {
  MainTitle,
  Text,
  Strong,
  Image,
  Grid,
  Container,
} from '../../../elements';
// images
import OnboardingImg1 from '../../../Images/onboarding1.svg';
// style
import { CalcHeight } from '../style';
import { setMediaFontSize } from '../../../styles/Media';
import { limitWidth } from '../../../styles/Mixin';

const Page1 = () => {
  return (
    <Grid addstyle={CalcHeight}>
      <Container padding="0" height="100%">
        <MainTitle
          fs="xxl"
          fw="black"
          margin="0 0 30px"
          addstyle={setMediaFontSize('tab')}
        >
          나만 아는 여<Strong color="brandColor">행</Strong>
        </MainTitle>

        <Text
          fs="lg"
          wb="keep-all"
          addstyle={setMediaFontSize('sxl')}
          margin="0 0 40px"
        >
          당신만 알고 있는 맛집, 숨은 명소들을 알려주는 여행 길잡이가 되어보세요
        </Text>

        <Grid height="calc(100% - 210px)">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/travel"
          >
            Travel vector created by stories - www.freepik.com
            <Image
              width="auto"
              height="100%"
              addstyle={limitWidth('100%')}
              src={OnboardingImg1}
            />
          </a>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page1;

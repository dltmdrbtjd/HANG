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
// style
import { CalcHeight, OnboardingImageSize } from '../style';
import { setMediaFontSize } from '../../../styles/Media';

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

        <Grid height="calc(100% - 210px)" addstyle={OnboardingImageSize}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/travel"
          >
            Travel vector created by stories - www.freepik.com
            <Image
              width="100%"
              height="100%"
              src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/onboarding/onboarding1.png"
            />
          </a>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page1;

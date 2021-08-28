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

const Page2 = () => {
  return (
    <Grid position="relative" addstyle={CalcHeight}>
      <Container padding="0" height="100%">
        <MainTitle
          fs="xxl"
          fw="black"
          margin="0 0 30px"
          addstyle={setMediaFontSize('tab')}
        >
          또, 너만 아는 여<Strong color="brandColor">행</Strong>
        </MainTitle>

        <Text
          fs="lg"
          wb="keep-all"
          addstyle={setMediaFontSize('sxl')}
          margin="0 0 40px"
        >
          내가 처음 가는 곳을 가장 잘 아는 친구와
          <br /> 동네 구석구석 여행해 보세요
        </Text>

        <Grid height="calc(100% - 210px)" addstyle={OnboardingImageSize}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/menu"
          >
            Menu vector created by pikisuperstar - www.freepik.com
            <Image
              width="100%"
              height="100%"
              src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/onboarding/onboarding2.png"
            />
          </a>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page2;

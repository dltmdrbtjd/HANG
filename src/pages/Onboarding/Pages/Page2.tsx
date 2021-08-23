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
import OnboardingImg2 from '../../../Images/onboarding2.svg';
// style
import { CalcHeight, TabletImageSize } from '../style';
import { setTabletFontSize } from '../../../styles/Media';

const Page2 = () => {
  return (
    <Grid position="relative" addstyle={CalcHeight}>
      <Container padding="0" height="100%">
        <MainTitle
          fs="xxl"
          fw="black"
          margin="0 0 30px"
          addstyle={setTabletFontSize('tab')}
        >
          또, 너만 아는 여<Strong color="brandColor">행</Strong>
        </MainTitle>

        <Text fs="lg" wb="keep-all" addstyle={setTabletFontSize('sxl')}>
          내가 처음 가는 곳을 가장 잘 아는 친구와 동네 구석구석 여행해 보세요
        </Text>

        <Grid position="absolute" top="33%" left="0" addstyle={TabletImageSize}>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.freepik.com/vectors/menu"
          >
            Menu vector created by pikisuperstar - www.freepik.com
            <Image src={OnboardingImg2} />
          </a>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page2;

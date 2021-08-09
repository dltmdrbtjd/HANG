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

const Page1 = () => {
  return (
    <Grid position="relative" addstyle={CalcHeight}>
      <Container height="100%">
        <MainTitle fs="xxl" fw="black" margin="0 0 30px">
          나만 아는 여
          <Strong fs="xxl" fw="black" color="brandColor">
            행
          </Strong>
        </MainTitle>

        <Text fs="lg" wb="keep-all">
          당신만 알고 있는 맛집, 숨은 명소들을 알려주는 여행 길잡이가 되어보세요
        </Text>

        <Grid position="absolute" top="33%" left="0">
          <Image src={OnboardingImg1} />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Page1;

import React from 'react';
// history
import { history } from '../../redux/configureStore';
// elements
import { Button, MainTitle, Text, Strong, Image, Grid } from '../../elements';
// images
import NotFoundImg from '../../Images/404_image.png';

const NotFound = () => {
  return (
    <>
      <MainTitle fs="xxl" margin="0 0 23px">
        <Strong color="brandColor">잠깐!</Strong>
        <br /> 길을 잃어버린
        <br /> 여행자를 찾습니다
      </MainTitle>

      <Text fs="lg" margin="0 0 50px">
        행과 함께라면 다시 찾을 수 있어요
      </Text>

      <Image src={NotFoundImg} alt="404 Not Found" />

      <Grid position="absolute" bottom="110px" left="0">
        <Button
          width="100%"
          fs="la"
          fw="bold"
          _onClick={() => history.replace('/')}
        >
          홈으로 이동
        </Button>
      </Grid>
    </>
  );
};

export default NotFound;

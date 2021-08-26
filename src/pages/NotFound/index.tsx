import React from 'react';
// history
import { history } from '../../redux/configureStore';
// elements
import {
  Button,
  MainTitle,
  Text,
  Strong,
  Image,
  Grid,
  Container,
} from '../../elements';
// style
import { setMediaLimitBoxSize } from '../../styles/Media';

const NotFound = () => {
  return (
    <Container padding="0" isFlex>
      <MainTitle fs="xxl" fw="black" padding="45px 0 23px">
        <Strong color="brandColor">잠깐!</Strong>
        <br /> 길을 잃어버린
        <br /> 여행자를 찾습니다
      </MainTitle>

      <Text fs="lg" margin="0 0 50px">
        행과 함께라면 다시 찾을 수 있어요
      </Text>

      <Grid margin="0 auto 40px" addstyle={setMediaLimitBoxSize('680px')}>
        <Image
          src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/404_image.png"
          alt="404 Not Found"
        />
      </Grid>

      <Button
        width="100%"
        fs="la"
        fw="bold"
        _onClick={() => history.replace('/')}
        margin="0 0 20px"
      >
        홈으로 이동
      </Button>
    </Container>
  );
};

export default NotFound;

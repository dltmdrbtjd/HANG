import React from 'react';

// style
import { MainTitle, Grid, Text } from '../../elements';
import { GuideRequestStyle } from './style';

const GuideRequest = () => {
  return (
    <GuideRequestStyle>
      <MainTitle fs="la">부탁하고 싶은 여행을 선택해 주세요</MainTitle>
      <Grid display="flex" height="60px">
        <Grid>
          <input type="radio" id="1" name="1" value="아니뭐" />
          <label htmlFor="1">안녕하세요?</label>
          <input type="radio" id="2" name="2" value="아니뭐" />
          <label htmlFor="2">안녕하세요?</label>
        </Grid>
        <Grid>
          <Text>07.25 ~ 07.26</Text>
          <Text>경기도 광주시</Text>
        </Grid>
      </Grid>
    </GuideRequestStyle>
  );
};

export default GuideRequest;

import React from 'react';
// elements
import { Grid, MainTitle, SubTitle, Button, TextArea } from '../../../elements';
// components
import Calendar from '../../../components/Calendar';
import AreaSelectBox from '../../../components/AreaSelectBox';

const CreateTrip = () => {
  return (
    <>
      <MainTitle fs="sxl" margin="0 0 24px">
        여행 일자를 선택해주세요
      </MainTitle>

      <Calendar />

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          여행 장소를 선택해주세요
        </SubTitle>

        <AreaSelectBox toggle />
      </Grid>

      <Grid margin="60px 0 30px">
        <SubTitle fs="la" margin="0 0 12px">
          본인이 원하는 여행을 소개해주세요
        </SubTitle>

        <TextArea />
      </Grid>

      <Button width="100%" fs="la" margin="0 0 40px">
        등록하기
      </Button>
    </>
  );
};

export default CreateTrip;

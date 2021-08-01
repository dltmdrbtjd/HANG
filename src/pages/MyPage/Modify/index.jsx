import React from 'react';
// elements
import { Grid, MainTitle, SubTitle, Button, TextArea } from '../../../elements';
// container
import InputImage from '../../../components/SelectImage';
import ValidateInput from '../../SignUp/ValidateInput';
import AreaSelectBox from '../../../components/AreaSelectBox';

const MyPageModify = () => {
  return (
    <>
      <Grid>
        <MainTitle MainTitle fs="sxl">
          프로필 수정
        </MainTitle>

        <InputImage />
      </Grid>

      <Grid>
        <SubTitle fs="la" margin="0 0 12px">
          닉네임
        </SubTitle>

        <Grid display="flex" hoz="space-between">
          <ValidateInput id="nickname" placeholder="닉네임 입력" width="55%" />

          <Button width="42%">중복 확인</Button>
        </Grid>
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          지역 선택
        </SubTitle>

        <AreaSelectBox toggle />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          자기 소개
        </SubTitle>

        <TextArea />
      </Grid>
    </>
  );
};

export default MyPageModify;

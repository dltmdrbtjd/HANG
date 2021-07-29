import React from 'react';
// elements
import { Grid, Button, Input, MainTitle, Link } from '../../../elements';
// components
import SelectBox from '../../../components/SelectBox/index';

const SignUpPage1 = () => {
  const agencyOptions = ['SKT', 'KT', 'LG U+', '알뜰폰'];

  return (
    <>
      <MainTitle fs="xl" fw="extraBold" ls="-1px">
        번호&nbsp;인증이 필요한&nbsp;서비스&nbsp;입니다
      </MainTitle>

      <Grid position="absolute" top="50%" left="0" translate="0, -50%">
        <SelectBox initailOption="통신사 선택" contents={agencyOptions} />

        <Grid display="flex" hoz="space-between" margin="0 0 30px">
          <Input placeholder="전화번호 입력" type="tel" width="55%" />

          <Button width="42%">인증번호 받기</Button>
        </Grid>

        <Grid display="flex" hoz="space-between">
          <Input placeholder="인증번호 입력" type="number" width="55%" />

          <Button width="42%">인증 확인</Button>
        </Grid>
      </Grid>

      <Grid position="absolute" bottom="20px" left="0">
        <Link
          href="/signup/2"
          bgcolor="brandColor"
          fs="la"
          fw="bold"
          width="100%"
          padding="12px 0"
          color="white"
          hoz="center"
          radius="14px"
          shadow="0 4px 4px rgba(134,134,134,0.3)"
        >
          다음
        </Link>
      </Grid>
    </>
  );
};

export default SignUpPage1;

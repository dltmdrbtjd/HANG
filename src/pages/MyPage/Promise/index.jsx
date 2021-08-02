import React from 'react';
// elements
import { Grid, MainTitle, SubTitle, Link } from '../../../elements';
// component
import PromiseCard from './PromiseCard';

const MyPromise = () => {
  return (
    <>
      <Grid display="flex">
        <MainTitle fs="sxl" width="auto">
          <Link href="/mypage" color="gray">
            프로필
          </Link>
        </MainTitle>

        <MainTitle fs="sxl" width="auto" margin="0 0 0 20px">
          <Link href="/mypage/promise">나의 약속</Link>
        </MainTitle>
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          받은 요청
        </SubTitle>

        <PromiseCard type="received" />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          보낸 요청
        </SubTitle>

        <PromiseCard />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          확정한 약속
        </SubTitle>

        <PromiseCard />
      </Grid>
    </>
  );
};

export default MyPromise;

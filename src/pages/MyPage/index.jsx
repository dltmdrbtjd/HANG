import React, { useState } from 'react';
// elements
import { Grid, MainTitle } from '../../elements';
// component
import DropDown from './DropDown';
// page
import MyInfo from './MyInfo';
import MyPromise from './Promise';
// style
import { TabMenuWrapper } from './style';

const MyPage = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      <Grid display="flex" ver="center" hoz="space-between" margin="0 0 16px">
        <TabMenuWrapper>
          <li
            onClick={() => {
              setPage(0);
            }}
          >
            <MainTitle
              width="auto"
              fs="sxl"
              color={page === 0 ? 'black' : 'gray'}
            >
              프로필
            </MainTitle>
          </li>

          <li
            onClick={() => {
              setPage(1);
            }}
          >
            <MainTitle
              fs="sxl"
              width="auto"
              margin="0 0 0 20px"
              color={page === 1 ? 'black' : 'gray'}
            >
              나의 약속
            </MainTitle>
          </li>
        </TabMenuWrapper>

        {page === 0 ? <DropDown /> : null}
      </Grid>{' '}
      {page === 0 ? <MyInfo /> : <MyPromise />}
    </>
  );
};

export default MyPage;

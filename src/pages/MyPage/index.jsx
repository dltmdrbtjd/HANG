import React, { useState } from 'react';
// icon
import EditIcon from '@material-ui/icons/Edit';
// history
import { history } from '../../redux/configureStore';
// elements
import { Grid, MainTitle, Button } from '../../elements';
// page
import MyInfo from './MyInfo';
import MyPromise from './Promise';
// style
import { TabMenuWrapper, SetAlignItemsButton } from './style';

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

        {page === 0 ? (
          <Button
            padding="0"
            bgColor="bgColor"
            color="darkG"
            addstyle={SetAlignItemsButton}
            _onClick={() => {
              history.push('/mypage/modify');
            }}
          >
            수정하기 <EditIcon style={{ marginLeft: '4px' }} />
          </Button>
        ) : null}
      </Grid>{' '}
      {page === 0 ? <MyInfo /> : <MyPromise />}
    </>
  );
};

export default MyPage;

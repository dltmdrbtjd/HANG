import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
// history
import { history } from '../../../../redux/configureStore';
// elements
import { SubTitle, Grid, MainTitle } from '../../../../elements';
// components
import PromiseCard from '../PromiseCard';
import NoInfo from '../../../../components/NoInfo';
// style
import { TabMenuWrapper } from '../../style';

const MyPromiseDetail = ({ match }) => {
  const page = parseInt(match.params.page, 10);
  const promises = useSelector(
    state => [
      state.mypage.promise.received,
      state.mypage.promise.requested,
      state.mypage.promise.confirmed,
    ],
    shallowEqual,
  );

  const pageBreak = {
    type: ['received', 'requested', 'confirmed'],
    title: ['받은 요청', '보낸 요청', '확정한 약속'],
    postComent: [
      '받은 요청이 없습니다',
      '보낸 요청이 없습니다',
      '확정된 약속이 없습니다',
    ],
    guide: [false, true],
  };

  return (
    <>
      <Grid display="flex" ver="center" hoz="space-between" margin="0 0 16px">
        <TabMenuWrapper>
          <li onClick={() => history.push('/mypage')}>
            <MainTitle width="auto" fs="sxl" color="gray">
              프로필
            </MainTitle>
          </li>

          <li onClick={() => history.push('/mypage/promise')}>
            <MainTitle fs="sxl" width="auto" margin="0 0 0 20px" color="black">
              나의 약속
            </MainTitle>
          </li>
        </TabMenuWrapper>
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" width="auto" margin="0 0 15px">
          {pageBreak.title[page - 1]}
        </SubTitle>

        <NoInfo
          list={promises[page - 1]}
          contents={pageBreak.postComent[page - 1]}
        >
          {promises[page - 1].map((promInfo, idx) => (
            <PromiseCard
              key={(Date.now() + Math.random() * idx).toString(36)}
              type={pageBreak.type[page - 1]}
              guide={
                {}.hasOwnProperty.call(pageBreak.guide, page - 1)
                  ? pageBreak.guide[page - 1]
                  : promInfo.guide
              }
              promInfo={promInfo}
            />
          ))}
        </NoInfo>
      </Grid>
    </>
  );
};

export default MyPromiseDetail;

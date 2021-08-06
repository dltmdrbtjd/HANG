import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
// elements
import { SubTitle } from '../../../../elements';
// components
import PromiseCard from '../PromiseCard';

const MyPromiseDetail = ({ match }) => {
  const page = parseInt(match.params.page, 10);
  const pageTitles = ['받은 요청', '보낸 요청', '확정한 약속'];
  const promises = useSelector(
    state => [
      state.mypage.promise.received,
      state.mypage.promise.requested,
      state.mypage.promise.confirmed,
    ],
    shallowEqual,
  );

  return (
    <>
      <SubTitle fs="la" width="auto">
        {pageTitles[page - 1]}
      </SubTitle>

      {promises[page - 1].map((promInfo, idx) => (
        <PromiseCard
          key={(Date.now() + Math.random() * idx).toString(36)}
          received={page === 1}
          guide={promInfo.guide}
          promInfo={promInfo}
        />
      ))}
    </>
  );
};

export default MyPromiseDetail;

import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// elements
import { Grid, SubTitle } from '../../../elements';
// component
import PromiseCard from './PromiseCard';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';

const MyPromise = () => {
  const { received, requested, confirmed } = useSelector(
    state => ({
      received: state.mypage.receivedProm,
      requested: state.mypage.requestedProm,
      confirmed: state.mypage.confirmedProm,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MypageCreators.GetMyPromiseDB());
  }, []);

  return (
    <Grid margin="0 0 60px">
      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          받은 요청
        </SubTitle>

        {received.slice(3).map(promInfo => (
          <PromiseCard
            key={(Date.now() + Math.random()).toString(36)}
            received
            promInfo={promInfo}
          />
        ))}
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          보낸 요청
        </SubTitle>

        {requested.slice(3).map(promInfo => (
          <PromiseCard
            key={(Date.now() + Math.random()).toString(36)}
            guide
            promInfo={promInfo}
          />
        ))}
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 15px">
          확정한 약속
        </SubTitle>

        {confirmed.slice(3).map(promInfo => (
          <PromiseCard
            key={(Date.now() + Math.random()).toString(36)}
            guide={promInfo.guide}
            promInfo={promInfo}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default MyPromise;

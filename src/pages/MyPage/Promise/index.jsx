import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// elements
import { Grid, SubTitle, Button } from '../../../elements';
// component
import PromiseCard from './PromiseCard';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';
// style
import { SetAlignItemsButton } from '../style';

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
        <Grid display="flex" ver="center" hoz="space-between" margin="0 0 15px">
          <SubTitle fs="la" width="auto">
            받은 요청
          </SubTitle>

          <Button
            padding="0"
            bgColor="bgColor"
            color="darkG"
            addstyle={SetAlignItemsButton}
          >
            더 보기{' '}
            <ArrowForwardIosIcon
              fontSize="small"
              style={{ marginLeft: '5px' }}
            />
          </Button>
        </Grid>

        {received.slice(3).map(promInfo => (
          <PromiseCard
            key={(Date.now() + Math.random()).toString(36)}
            received
            promInfo={promInfo}
          />
        ))}
      </Grid>

      <Grid margin="60px 0 0">
        <Grid display="flex" ver="center" hoz="space-between" margin="0 0 15px">
          <SubTitle fs="la" width="auto">
            보낸 요청
          </SubTitle>

          <Button
            padding="0"
            bgColor="bgColor"
            color="darkG"
            addstyle={SetAlignItemsButton}
          >
            더 보기{' '}
            <ArrowForwardIosIcon
              fontSize="small"
              style={{ marginLeft: '5px' }}
            />
          </Button>
        </Grid>

        {requested.slice(3).map(promInfo => (
          <PromiseCard
            key={(Date.now() + Math.random()).toString(36)}
            guide
            promInfo={promInfo}
          />
        ))}
      </Grid>

      <Grid margin="60px 0 0">
        <Grid display="flex" ver="center" hoz="space-between" margin="0 0 15px">
          <SubTitle fs="la" width="auto">
            확정한 약속
          </SubTitle>

          <Button
            padding="0"
            bgColor="bgColor"
            color="darkG"
            addstyle={SetAlignItemsButton}
          >
            더 보기{' '}
            <ArrowForwardIosIcon
              fontSize="small"
              style={{ marginLeft: '5px' }}
            />
          </Button>
        </Grid>

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

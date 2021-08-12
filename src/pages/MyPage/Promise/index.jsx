import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, SubTitle, Button, MainTitle, Ul, List } from '../../../elements';
// component
import PromiseCard from './PromiseCard';
import NoPosts from '../../../components/NoPosts';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';
// style
// import { SetAlignItemsButton, TabMenuWrapper } from '../style';
import { TabWrapper, TabLayout, TabSize } from './style';

const MyPromise = () => {
  const { received, requested, confirmed } = useSelector(
    state => ({
      received: state.mypage.promise.received,
      requested: state.mypage.promise.requested,
      confirmed: state.mypage.promise.confirmed,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(MypageCreators.GetMyPromiseDB());
  }, []);

  return (
    <>
      <Grid isFlex ver="center" hoz="space-between" margin="0 0 16px">
        <Ul isFlex>
          <List _onClick={() => history.push('/mypage')}>
            <MainTitle width="auto" fs="sxl" color="gray">
              프로필
            </MainTitle>
          </List>

          <List _onClick={() => history.push('/mypage/promise')}>
            <MainTitle fs="sxl" width="auto" margin="0 0 0 20px" color="black">
              나의 약속
            </MainTitle>
          </List>
        </Ul>
      </Grid>

      <Grid margin="0 0 60px">
        <NoPosts
          list={received.concat(requested).concat(confirmed)}
          title="약속 잡으러 가기"
          coment="다른 사람들과 여행 약속을 잡아보세요"
          link="/"
          margin="60px 0 0"
        >
          {received.length ? (
            <Grid margin="60px 0 0">
              <Grid isFlex ver="center" hoz="space-between" margin="0 0 15px">
                <SubTitle fs="la" width="auto">
                  받은 요청
                </SubTitle>

                <Button
                  isFlex
                  ver="center"
                  form="text"
                  color="darkG"
                  _onClick={() => history.push('/mypage/promise/1')}
                >
                  더 보기{' '}
                  <ArrowForwardIosIcon
                    fontSize="small"
                    style={{ marginLeft: '5px' }}
                  />
                </Button>
              </Grid>

              <Grid tab={TabWrapper}>
                <Grid tab={TabLayout} length={received.length}>
                  {received.slice(0, 3).map(promInfo => (
                    <PromiseCard
                      key={(Date.now() + Math.random()).toString(36)}
                      type="received"
                      promInfo={promInfo}
                      tab={TabSize}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          {requested.length ? (
            <Grid margin="60px 0 0">
              <Grid isFlex ver="center" hoz="space-between" margin="0 0 15px">
                <SubTitle fs="la" width="auto">
                  보낸 요청
                </SubTitle>

                <Button
                  isFlex
                  ver="center"
                  form="text"
                  color="darkG"
                  _onClick={() => history.push('/mypage/promise/2')}
                >
                  더 보기{' '}
                  <ArrowForwardIosIcon
                    fontSize="small"
                    type="requested"
                    style={{ marginLeft: '5px' }}
                  />
                </Button>
              </Grid>

              <Grid tab={TabWrapper}>
                <Grid tab={TabLayout} length={requested.length}>
                  {requested.slice(0, 3).map(promInfo => (
                    <PromiseCard
                      key={(Date.now() + Math.random()).toString(36)}
                      guide
                      type="requested"
                      promInfo={promInfo}
                      tab={TabSize}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          {confirmed.length ? (
            <Grid margin="60px 0 0">
              <Grid isFlex ver="center" hoz="space-between" margin="0 0 15px">
                <SubTitle fs="la" width="auto">
                  확정된 약속
                </SubTitle>

                <Button
                  isFlex
                  ver="center"
                  form="text"
                  color="darkG"
                  _onClick={() => history.push('/mypage/promise/3')}
                >
                  더 보기{' '}
                  <ArrowForwardIosIcon
                    fontSize="small"
                    type="confirmed"
                    style={{ marginLeft: '5px' }}
                  />
                </Button>
              </Grid>

              <Grid tab={TabWrapper}>
                <Grid tab={TabLayout} length={confirmed.length}>
                  {confirmed.slice(0, 3).map(promInfo => (
                    <PromiseCard
                      key={(Date.now() + Math.random()).toString(36)}
                      guide={promInfo.guide}
                      promInfo={promInfo}
                      type="confirmed"
                      tab={TabSize}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </NoPosts>
      </Grid>
    </>
  );
};

export default MyPromise;

import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// history
import { history } from '../../../redux/configureStore';
// elements
import { Grid, SubTitle, Button, MainTitle } from '../../../elements';
// component
import PromiseCard from './PromiseCard';
import NoPosts from '../../../components/NoPosts';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';
// style
import { SetAlignItemsButton, TabMenuWrapper } from '../style';

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

      <Grid margin="0 0 60px">
        <NoPosts
          list={received.concat(requested).concat(confirmed)}
          coment="아직 아무런 약속이 없어요"
          link="/"
          btnComent="약속 잡으러 가기"
          margin="60px 0 0"
        >
          {received.length ? (
            <Grid margin="60px 0 0">
              <Grid
                display="flex"
                ver="center"
                hoz="space-between"
                margin="0 0 15px"
              >
                <SubTitle fs="la" width="auto">
                  받은 요청
                </SubTitle>

                <Button
                  padding="0"
                  bgColor="bgColor"
                  color="darkG"
                  addstyle={SetAlignItemsButton}
                  _onClick={() => history.push('/mypage/promise/1')}
                >
                  더 보기{' '}
                  <ArrowForwardIosIcon
                    fontSize="small"
                    style={{ marginLeft: '5px' }}
                  />
                </Button>
              </Grid>

              {received.slice(0, 3).map(promInfo => (
                <PromiseCard
                  key={(Date.now() + Math.random()).toString(36)}
                  type="received"
                  promInfo={promInfo}
                />
              ))}
            </Grid>
          ) : null}

          {requested.length ? (
            <Grid margin="60px 0 0">
              <Grid
                display="flex"
                ver="center"
                hoz="space-between"
                margin="0 0 15px"
              >
                <SubTitle fs="la" width="auto">
                  보낸 요청
                </SubTitle>

                <Button
                  padding="0"
                  bgColor="bgColor"
                  color="darkG"
                  addstyle={SetAlignItemsButton}
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

              {requested.slice(0, 3).map(promInfo => (
                <PromiseCard
                  key={(Date.now() + Math.random()).toString(36)}
                  guide
                  type="requested"
                  promInfo={promInfo}
                />
              ))}
            </Grid>
          ) : null}

          {confirmed.length ? (
            <Grid margin="60px 0 0">
              <Grid
                display="flex"
                ver="center"
                hoz="space-between"
                margin="0 0 15px"
              >
                <SubTitle fs="la" width="auto">
                  확정한 약속
                </SubTitle>

                <Button
                  padding="0"
                  bgColor="bgColor"
                  color="darkG"
                  addstyle={SetAlignItemsButton}
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

              {confirmed.slice(0, 3).map(promInfo => (
                <PromiseCard
                  key={(Date.now() + Math.random()).toString(36)}
                  guide={promInfo.guide}
                  promInfo={promInfo}
                  type="confirmed"
                />
              ))}
            </Grid>
          ) : null}
        </NoPosts>
      </Grid>
    </>
  );
};

export default MyPromise;

import React from 'react';
// redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// reducer
import { MyPageCreators } from 'src/redux/modules/MyPageModule/mypage';
// type
import { PromInfo } from 'src/redux/modules/MyPageModule/type';
// icon
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// history
import ToastMessage from 'src/components/ToastMessage';
import { history, RootState } from '../../../redux/configureStore';
// elements
import {
  Grid,
  SubTitle,
  Button,
  MainTitle,
  Ul,
  List,
  Container,
} from '../../../elements';
// component
import PromiseCard from './PromiseCard';
import NoPosts from '../../../components/NoPosts';
import MyPromiseDetail from './MyPromise';
// style
import { setTabletWrapper, setTabletPromiseCard } from './style';

const MyPromise = () => {
  const [msg, setMsg] = React.useState<string>('');

  const { received, requested, confirmed }: any = useSelector<RootState>(
    (state) => ({
      received: state.mypage.promise.received,
      requested: state.mypage.promise.requested,
      confirmed: state.mypage.promise.confirmed,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();

  const [openDetail, setOpenDetail] = React.useState<{
    open: boolean;
    type: string;
  }>({ open: false, type: '' });

  React.useEffect(() => {
    dispatch(MyPageCreators.fetchGetMyPromise());
  }, []);

  return (
    <Container>
      <Grid isFlex ver="center" hoz="space-between" margin="0 0 16px">
        <Ul isFlex>
          <List _onClick={() => history.push('/mypage')}>
            <MainTitle width="auto" fs="sxl" color="gray">
              프로필
            </MainTitle>
          </List>

          <List _onClick={() => setOpenDetail({ open: false, type: '' })}>
            <MainTitle fs="sxl" width="auto" margin="0 0 0 20px" color="black">
              나의 약속
            </MainTitle>
          </List>
        </Ul>
      </Grid>

      {!openDetail.open ? (
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
                    color="darkGray"
                    fw="regular"
                    _onClick={() =>
                      setOpenDetail({ open: true, type: 'received' })
                    }
                  >
                    더 보기{' '}
                    <ArrowForwardIosIcon
                      fontSize="small"
                      style={{ marginLeft: '5px' }}
                    />
                  </Button>
                </Grid>

                <Grid addstyle={setTabletWrapper}>
                  <Grid addstyle={setTabletPromiseCard(received.length)}>
                    {received.slice(0, 3).map((promInfo: PromInfo) => (
                      <PromiseCard
                        key={(Date.now() + Math.random()).toString(36)}
                        type="received"
                        promInfo={promInfo}
                        stateSetter={setMsg}
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
                    color="darkGray"
                    fw="regular"
                    _onClick={() =>
                      setOpenDetail({ open: true, type: 'requested' })
                    }
                  >
                    더 보기{' '}
                    <ArrowForwardIosIcon
                      fontSize="small"
                      type="requested"
                      style={{ marginLeft: '5px' }}
                    />
                  </Button>
                </Grid>

                <Grid addstyle={setTabletWrapper}>
                  <Grid addstyle={setTabletPromiseCard(received.length)}>
                    {requested.slice(0, 3).map((promInfo: PromInfo) => (
                      <PromiseCard
                        key={(Date.now() + Math.random()).toString(36)}
                        stateSetter={setMsg}
                        guide
                        type="requested"
                        promInfo={promInfo}
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
                    color="darkGray"
                    fw="regular"
                    _onClick={() =>
                      setOpenDetail({ open: true, type: 'confirmed' })
                    }
                  >
                    더 보기{' '}
                    <ArrowForwardIosIcon
                      fontSize="small"
                      type="confirmed"
                      style={{ marginLeft: '5px' }}
                    />
                  </Button>
                </Grid>

                <Grid addstyle={setTabletWrapper}>
                  <Grid addstyle={setTabletPromiseCard(received.length)}>
                    {confirmed.slice(0, 3).map((promInfo: PromInfo) => (
                      <PromiseCard
                        key={(Date.now() + Math.random()).toString(36)}
                        stateSetter={setMsg}
                        guide={Boolean(promInfo.guide)}
                        promInfo={promInfo}
                        type="confirmed"
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </NoPosts>
        </Grid>
      ) : (
        <MyPromiseDetail type={openDetail.type} />
      )}
      <ToastMessage msg={msg} />
    </Container>
  );
};

export default MyPromise;

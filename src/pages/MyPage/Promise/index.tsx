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
import NoInfo from '../../../components/NoInfo';
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
          <NoInfo
            list={received.concat(requested).concat(confirmed)}
            contents="아직 약속이 없어요"
            imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/eventnotfound.png"
          >
            {received.length ? (
              <Grid margin="60px 0 0">
                <Grid isFlex ver="center" hoz="space-between" margin="0 0 15px">
                  <SubTitle fs="la" width="auto">
                    받은 요청
                  </SubTitle>

                  {received.length > 3 ? (
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
                  ) : null}
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

                  {requested.length > 3 ? (
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
                  ) : null}
                </Grid>

                <Grid addstyle={setTabletWrapper}>
                  <Grid addstyle={setTabletPromiseCard(requested.length)}>
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

                  {confirmed.length > 3 ? (
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
                  ) : null}
                </Grid>

                <Grid addstyle={setTabletWrapper}>
                  <Grid addstyle={setTabletPromiseCard(confirmed.length)}>
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
          </NoInfo>
        </Grid>
      ) : (
        <MyPromiseDetail type={openDetail.type} />
      )}
      <ToastMessage msg={msg} />
    </Container>
  );
};

export default MyPromise;

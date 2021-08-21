import React from 'react';
// moment
import moment from 'moment';
// redux
import { HomeCreators } from 'src/redux/modules/HomeModule/home';
import { shallowEqual, useDispatch } from 'react-redux';
// components
import SearchBar from 'src/components/SearchBar';
import SearchCard from 'src/components/SearchCard';
import ToastMessage from '../../components/ToastMessage';
import { history, useTypedSelector } from '../../redux/configureStore';
// style
import { Grid, Text, MainTitle, Container } from '../../elements/index';
import PromiseCard from './style';
import ProfileImg from '../../components/ProfileImg';
import { textOverflow } from '../../styles/Mixin';

const Home = () => {
  const dispatch = useDispatch();
  const { promise, guide, traveler, list, message }: any = useTypedSelector(
    (state) => ({
      list: state.home.HomeData,
      promise: state.home.HomeData.confirmed,
      guide: state.home.HomeData.guide,
      traveler: state.home.HomeData.traveler,
      message: state.toastMessage.Message,
    }),
    shallowEqual,
  );

  const mainlist = Object.keys(list);

  React.useEffect(() => {
    dispatch(HomeCreators.fetchHomeLoad());
  }, []);
  return (
    <Container>
      <Grid overflow="auto">
        {promise ? (
          <>
            <MainTitle fs="la" margin="0 0 10px">
              확정된 약속
            </MainTitle>
            <PromiseCard>
              <Grid
                isFlex
                hoz="center"
                ver="center"
                cursor="pointer"
                _onClick={() => {
                  history.push('/mypage/promise/3');
                }}
              >
                <ProfileImg imgUrl={promise.profileImg} size="medium" />
                <Grid margin="0 0 0 10px" addstyle="flex: 1">
                  <Grid>
                    <Text fs="la" fw="bold" addstyle={textOverflow()}>
                      {promise.nickname} 님과의 약속
                    </Text>
                  </Grid>
                  <Text>
                    {moment.utc(promise.startDate).format('MM. DD')} -{' '}
                    {moment.utc(promise.endDate).format('MM. DD')}
                  </Text>
                </Grid>
              </Grid>
            </PromiseCard>
          </>
        ) : (
          <PromiseCard>
            <Text fs="la" fw="bold">
              다른 지역으로 떠나보는 건 어떠세요?
            </Text>
            <Text fs="sm" fw="regular">
              여행 일정을 공유하고 약속을 잡아 볼까요?
            </Text>
          </PromiseCard>
        )}
        <SearchBar margin="28px 0 0 0" />
        <Grid margin="60px 0 0 0">
          <MainTitle fs="la" margin="0 0 6px">
            내 지역을 여행하고 싶은 여행자예요
          </MainTitle>
          {traveler
            ? traveler.map((item, idx) => {
                return (
                  <SearchCard
                    key={idx}
                    userInfo={item}
                    category={mainlist[2]}
                    idx={idx}
                  />
                );
              })
            : ''}
        </Grid>
        <Grid margin="60px 0 60px 0">
          <MainTitle fs="la" margin="0 0 6px">
            내 지역에 함께 있는 길잡이예요
          </MainTitle>
          {guide
            ? guide.map((item, idx) => {
                return (
                  <SearchCard
                    key={idx}
                    userInfo={item}
                    category={mainlist[1]}
                    idx={idx}
                  />
                );
              })
            : ''}
        </Grid>
      </Grid>
      {message && <ToastMessage msg="관심목록에 추가되었습니다" />}
    </Container>
  );
};

export default Home;

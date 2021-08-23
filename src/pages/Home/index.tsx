import React from 'react';
// moment
import moment from 'moment';
// redux
import { HomeCreators } from 'src/redux/modules/HomeModule/home';
import { useDispatch } from 'react-redux';
// components
import SearchBar from 'src/components/SearchBar';
import SearchCard from 'src/components/SearchCard';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import ToastMessage from '../../components/ToastMessage';
import { history, useTypedSelector } from '../../redux/configureStore';
// style
import { Grid, Text, MainTitle, Container } from '../../elements/index';
import PromiseCard from './style';
import ProfileImg from '../../components/ProfileImg';
import { limitWidth, textOverflow } from '../../styles/Mixin';

const Home = () => {
  const dispatch = useDispatch();
  const list = useTypedSelector((state) => state.home.HomeData);

  function listData() {
    if (list) {
      return Object.keys(list);
    }
    return null;
  }

  const mainlist = listData();

  React.useEffect(() => {
    dispatch(HomeCreators.fetchHomeLoad());
    dispatch(fetchMessage({ Message: false }));
  }, []);
  return (
    <Container>
      <Grid overflow="auto">
        {list && list.promise.nickname ? (
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
                  history.push('/mypage/promise');
                }}
              >
                <ProfileImg imgUrl={list.promise.profileImg} size="medium" />
                <Grid margin="0 0 0 10px" addstyle={limitWidth}>
                  <Grid>
                    <Text fs="la" fw="bold" addstyle={textOverflow()}>
                      {list.promise.nickname} 님과의 약속
                    </Text>
                  </Grid>
                  <Text>
                    {moment.utc(list.promise.startDate).format('MM. DD')} -{' '}
                    {moment.utc(list.promise.endDate).format('MM. DD')}
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
          {list && list.traveler
            ? list.traveler.map((item, idx) => {
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
          {list && list.guide
            ? list.guide.map((item, idx) => {
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
      <ToastMessage msg="관심목록에 추가되었습니다" />
    </Container>
  );
};

export default Home;

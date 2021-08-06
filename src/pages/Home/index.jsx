import React, { useEffect } from 'react';
// moment
import moment from 'moment';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { HomeCreators } from '../../redux/modules/home';
// components
import SearchBar from '../../components/SearchBar';
import TopBtn from '../../components/TopBtn';
import SearchCard from '../../components/SearchCard';
// style
import { Grid, Text, MainTitle } from '../../elements/index';
import PromiseCard from './style';
import ProfileImg from '../../components/ProfileImg';

const Home = () => {
  const dispatch = useDispatch();

  const { promise, guide, traveler, like, lists } = useSelector(state => ({
    lists: state.home,
    promise: state.home.confirmed,
    guide: state.home.guide,
    traveler: state.home.traveler,
    like: state.favorite.boolean,
  }));

  const mainlist = Object.keys(lists);

  useEffect(() => {
    dispatch(HomeCreators.HomeLoadDB());
  }, [like]);

  return (
    <Grid overflow="auto">
      {promise ? (
        <>
          <MainTitle fs="la">확정된 약속</MainTitle>
          <PromiseCard>
            <Grid>
              <ProfileImg />
              <Grid>
                <Text>{promise.nickname}님과의 약속</Text>
                <Text>
                  {moment.utc(promise.startDate).format('MM.DD')} ~{' '}
                  {moment.utc(promise.EndDate).format('MM.DD')}
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
      <SearchBar />
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역을 여행하고 싶은 여행자에요</MainTitle>
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
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역에 함께있는 길잡이에요</MainTitle>
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
      <TopBtn />
    </Grid>
  );
};

export default Home;

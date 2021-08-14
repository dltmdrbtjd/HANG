import React, { useEffect } from 'react';
// moment
import moment from 'moment';
// redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HomeCreators } from '../../redux/modules/home';
// components
import SearchBar from '../../components/SearchBar';
import SearchCard from '../../components/SearchCard';
// style
import { Grid, Text, MainTitle } from '../../elements/index';
import PromiseCard from './style';
import ProfileImg from '../../components/ProfileImg';
import { history } from '../../redux/configureStore';
import { textOverflow } from '../../styles/Mixin';

const Home = () => {
  const dispatch = useDispatch();

  const { promise, guide, traveler, like, lists } = useSelector(
    state => ({
      lists: state.home,
      promise: state.home.confirmed,
      guide: state.home.guide,
      traveler: state.home.traveler,
      like: state.favorite.boolean,
    }),
    shallowEqual,
  );

  const mainlist = Object.keys(lists);

  useEffect(() => {
    dispatch(HomeCreators.HomeLoadDB());
  }, [like]);
  return (
    <Grid overflow="auto">
      {Object.keys(promise).length > 0 ? (
        <>
          <MainTitle fs="la" margin="0 0 10px">
            확정된 약속
          </MainTitle>
          <PromiseCard>
            <Grid
              isFlex
              hoz="center"
              ver="center"
              _onClick={() => {
                history.push('/mypage/promise/3');
              }}
            >
              <ProfileImg imgUrl={promise.profileImg} />
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
      <SearchBar margin="28px 0 0" />
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
  );
};

export default Home;

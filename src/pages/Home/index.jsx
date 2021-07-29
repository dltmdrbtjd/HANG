import React from 'react';
import SearchBar from '../../components/SearchBar';
import PromiseCard from './style';
import SearchCard from '../../components/SearchCard';
import { Grid, Text, MainTitle } from '../../elements/index';

const Home = () => {
  return (
    <Grid overflow="auto">
      <PromiseCard>
        <Text fs="la" fw="bold">
          다른 지역으로 떠나보는 건 어떠세요?
        </Text>
        <Text fs="sm" fw="regular">
          여행 일정을 공유하고 약속을 잡아 볼까요?
        </Text>
      </PromiseCard>
      <SearchBar />
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역을 여행하고 싶은 여행자에요</MainTitle>
        <SearchCard
          username="새싹님"
          age="20대"
          gender="남자"
          city="서울특별시 관악구"
        />
      </Grid>
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역에 함께있는 길잡이에요</MainTitle>
        <SearchCard
          username="새싹몬"
          age="20대"
          gender="남자"
          city="서울특별시 동작구"
        />
      </Grid>
    </Grid>
  );
};

export default Home;

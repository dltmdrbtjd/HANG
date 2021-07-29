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
          아직 약속이 없어요!
        </Text>
        <Text fs="sm">여행 일정을 공유하고 가이딩 약속을 잡아 볼까요?</Text>
      </PromiseCard>
      <SearchBar />
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역을 여행하고 싶은 여행자에요</MainTitle>
        <SearchCard />
      </Grid>
      <Grid margin="60px 0 0 0">
        <MainTitle fs="la">내 지역에 함께있는 길잡이에요</MainTitle>
        <SearchCard />
      </Grid>
    </Grid>
  );
};

export default Home;

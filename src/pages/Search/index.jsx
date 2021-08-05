import React, { useState } from 'react';

import { useSelector } from 'react-redux';
// query
import queryString from 'query-string';
// components
import SearchBar from '../../components/SearchBar';
import AreaSelectBox from '../../components/AreaSelectBox';
import SearchCard from '../../components/SearchCard';
// style
import { Button, Grid, Text, Strong } from '../../elements';
import CategoryBtn from './style';

const Search = props => {
  const userlist = useSelector(state => state.search.list);
  // 지역,여행자,길잡이 state
  const [cityOpen, setCityOpen] = useState(false);
  const [traveler, setTraveler] = useState(false);
  const [guide, setGuide] = useState(false);

  // 도시,구 state
  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');

  // 검색한 username state
  const [finduser, setFindUser] = useState('');

  // 검색한 도시,구 state
  const [cityName, setCityName] = useState('');
  const [guName, setGuName] = useState('');

  // 서버에 보낼 검색 데이터
  const content = {
    keyword: finduser,
    area: {
      region: city,
      city: gu,
    },
    traveler,
    guide,
  };
  console.log(`Component => src/pages/Search.jsx :`, content);

  const query = queryString.parse(location.search);
  const MainSearch = {
    keyword: query.keyword,
    area: {
      region: city,
      city: gu,
    },
    traveler,
    guide,
  };
  console.log(`Component => src/pages/Search.jsx :`, MainSearch);

  const CityOpenhandler = () => {
    if (!cityOpen) {
      setCityOpen(true);
      setCity('서울특별시');
      setGu('종로구');
    } else {
      setCityOpen(false);
      setCity('');
      setGu('');
    }
  };
  const Travelerhandler = () => {
    if (!traveler) {
      setTraveler(true);
    } else {
      setTraveler(false);
    }
  };
  const Guidehandler = () => {
    if (!guide) {
      setGuide(true);
    } else {
      setGuide(false);
    }
  };

  const SearchHandler = () => {
    setCityName(city);
    setGuName(gu);
    console.log(
      `Component => src/pages/Search.jsx :`,
      city,
      gu,
      traveler,
      guide,
      finduser,
    );
  };

  return (
    <>
      <SearchBar setFindUser={setFindUser} />
      <Grid
        width="100%"
        margin="10px 0 10px 0"
        display="flex"
        hoz="space-between"
      >
        <Grid>
          <CategoryBtn
            shadow="0 4px 4px rgba(134,134,134,0.3)"
            radius="14px"
            color={!cityOpen ? 'gray' : 'brandColor'}
            bgColor={
              !cityOpen ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'
            }
            border={!cityOpen ? '2px solid #c4c4c4' : '2px solid #ff9900'}
            padding="8px 30px"
            onClick={CityOpenhandler}
            fw="bold"
          >
            지역
          </CategoryBtn>
        </Grid>
        <Grid display="flex" hoz="flex-end">
          <CategoryBtn
            shadow="0 4px 4px rgba(134,134,134,0.3)"
            radius="14px"
            color={!traveler ? 'gray' : 'brandColor'}
            bgColor={
              !traveler ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'
            }
            border={!traveler ? '2px solid #c4c4c4' : '2px solid #ff9900'}
            padding="8px 15px"
            onClick={Travelerhandler}
            fw="bold"
          >
            여행자
          </CategoryBtn>
          <CategoryBtn
            shadow="0 4px 4px rgba(134,134,134,0.3)"
            radius="14px"
            color={!guide ? 'gray' : 'brandColor'}
            bgColor={!guide ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'}
            border={!guide ? '2px solid #c4c4c4' : '2px solid #ff9900'}
            padding="8px 15px"
            onClick={Guidehandler}
            margin="0 0 0 10px"
            fw="bold"
          >
            길잡이
          </CategoryBtn>
        </Grid>
      </Grid>
      <AreaSelectBox toggle={cityOpen} setGu={setGu} setCity={setCity} />
      <Button
        _onClick={SearchHandler}
        fw="bold"
        width="100%"
        margin="10px 0 0 0"
      >
        검색
      </Button>
      <Text margin="40px 0 0 0">
        <Strong>{cityName ? `${cityName}` : '회원 목록입니다.'}</Strong>
        {guName ? ` ${guName}의 검색 목록입니다.` : ''}
      </Text>
      <SearchCard userInfo={userlist} />
    </>
  );
};

export default Search;

import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { SearchCreators } from '../../redux/modules/search';
// query
// components
import SearchBar from '../../components/SearchBar';
import AreaSelectBox from '../../components/AreaSelectBox';
import SearchCard from '../../components/SearchCard';
// style
import { Button, Grid, Text, Strong } from '../../elements';
import CategoryBtn from './style';

const Search = props => {
  const dispatch = useDispatch();
  const userlist = useSelector(state => state.search.list);
  const SearchList = userlist.result;
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
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
  };

  const query = queryString.parse(location.search);
  // 페이지 첫 진입시 or 메인에서 검색후 페이지 진입시 사용할 데이터
  const MainSearch = {
    keyword: query.keyword,
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
  };

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
      setGuide(false);
    } else {
      setTraveler(false);
    }
  };
  const Guidehandler = () => {
    if (!guide) {
      setGuide(true);
      setTraveler(false);
    } else {
      setGuide(false);
    }
  };

  const SearchHandler = () => {
    setCityName(city);
    setGuName(gu);
    dispatch(SearchCreators.SearchSendDB(content));
  };

  useEffect(() => {
    dispatch(SearchCreators.SearchLoadDB(MainSearch));
  }, []);

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
      {SearchList
        ? SearchList.map((item, idx) => {
            return <SearchCard userInfo={item} key={idx} idx={idx} />;
          })
        : ''}
    </>
  );
};

export default Search;

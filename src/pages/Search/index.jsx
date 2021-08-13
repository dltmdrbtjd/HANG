import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { useInView } from 'react-intersection-observer';
import { SearchCreators } from '../../redux/modules/search';
import Spinner from '../../components/Spinner';
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
  const nextItem = useSelector(state => state.search.nextItem);
  // pageNum
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

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

  const query = queryString.parse(location.search);
  // 페이지 첫 진입시 or 메인에서 검색후 페이지 진입시 사용할 데이터
  const SendSearch = {
    keyword: finduser,
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
  };
  const MainSearch = {
    keyword: query.keyword,
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
  };

  const MoreSearch = {
    keyword: finduser,
    region: city,
    city: gu,
    traveler: Number(traveler),
    guide: Number(guide),
    pageNum: page,
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
    dispatch(SearchCreators.SearchSendDB(SendSearch));
    setPage(1);
  };

  // 무한스크롤 함수
  const NextItems = useCallback(async () => {
    if (page > 1 && userlist.length > 9) {
      await dispatch(SearchCreators.MoreSearchSendDB(MoreSearch));
    }
  }, [page]);

  useEffect(() => {
    NextItems();
  }, [NextItems]);

  useEffect(() => {
    if (inView && nextItem) {
      setPage(state => state + 1);
    }
  }, [inView, nextItem]);

  useEffect(() => {
    dispatch(SearchCreators.SearchLoadDB(MainSearch));
    // setPage(1);
  }, [query.keyword]);

  return (
    <>
      <SearchBar setFindUser={setFindUser} />
      <Grid width="100%" margin="16px 0" isFlex hoz="space-between">
        <Grid width="auto">
          <CategoryBtn
            radius="20px"
            color={!cityOpen ? 'gray' : 'brandColor'}
            bgColor={
              !cityOpen ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'
            }
            border={!cityOpen ? '1px solid #c4c4c4' : '1px solid #ff9900'}
            padding="8px 30px"
            onClick={CityOpenhandler}
            fw="bold"
          >
            지역
          </CategoryBtn>
        </Grid>
        <Grid width="auto">
          <CategoryBtn
            radius="20px"
            color={!traveler ? 'gray' : 'brandColor'}
            bgColor={
              !traveler ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'
            }
            border={!traveler ? '1px solid #c4c4c4' : '1px solid #ff9900'}
            padding="8px 15px"
            onClick={Travelerhandler}
            fw="bold"
          >
            여행자
          </CategoryBtn>
          <CategoryBtn
            radius="20px"
            color={!guide ? 'gray' : 'brandColor'}
            bgColor={!guide ? 'rgba(231,231,231,0.5)' : 'rgba(255,153,0,0.2)'}
            border={!guide ? '1px solid #c4c4c4' : '1px solid #ff9900'}
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
        padding="14px 0"
        margin="26px 0 0"
      >
        검색
      </Button>
      <Text margin="40px 0 0">
        <Strong>{cityName ? `${cityName}` : '회원 목록입니다.'}</Strong>
        {guName ? ` ${guName}의 회원목록입니다.` : ''}
      </Text>
      {userlist
        ? userlist.map((item, idx) => {
            return <SearchCard userInfo={item} key={idx} idx={idx} />;
          })
        : ''}
      <div ref={ref} style={{ marginBottom: '30px' }} />
    </>
  );
};

export default Search;

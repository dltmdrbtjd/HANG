import React, { useState } from 'react';

// components
import SearchBar from '../../components/SearchBar';
import AreaSelectBox from '../../components/AreaSelectBox';
import SearchCard from '../../components/SearchCard';
// style
import { Button, Grid, Text, Strong } from '../../elements';

const Search = () => {
  const [cityOpen, setCityOpen] = useState(false);
  const [traveler, setTraveler] = useState(false);
  const [guide, setGuide] = useState(false);

  const CityOpenhandler = () => {
    if (!cityOpen) {
      setCityOpen(true);
    } else {
      setCityOpen(false);
    }
  };
  const Travelerhandler = () => {
    if (!traveler) {
      setTraveler(true);
    } else {
      setTraveler(false);
    }
  };
  const Guidehadnler = () => {
    if (!guide) {
      setGuide(true);
    } else {
      setGuide(false);
    }
  };
  return (
    <>
      <SearchBar />
      <Grid
        width="100%"
        margin="10px 0 10px 0"
        display="flex"
        hoz="space-between"
      >
        <Grid>
          <Button
            bgColor={!cityOpen ? 'gray' : 'brandColor'}
            padding="4px 30px"
            _onClick={CityOpenhandler}
          >
            지역
          </Button>
        </Grid>
        <Grid display="flex" hoz="flex-end">
          <Button
            bgColor={!traveler ? 'gray' : 'brandColor'}
            padding="4px 30px"
            _onClick={Travelerhandler}
          >
            여행자
          </Button>
          <Button
            bgColor={!guide ? 'gray' : 'brandColor'}
            margin="0 0 0 10px"
            _onClick={Guidehadnler}
            padding="4px 30px"
          >
            길잡이
          </Button>
        </Grid>
      </Grid>
      <AreaSelectBox toggle={cityOpen} />
      <Button width="100%" margin="20px 0 0 0">
        검 색 하 기
      </Button>
      <Text margin="40px 0 0 0">
        <Strong>서울특별시 종로구</Strong>의 여행자입니다.
      </Text>
      <SearchCard
        username="새싹몬"
        age="20대"
        city="서울특별시 강남구"
        gender="남자"
      />
    </>
  );
};

export default Search;

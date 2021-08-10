import React, { useEffect, useState } from 'react';
// date format
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
// elements
import { Grid, MainTitle, SubTitle, Button, TextArea } from '../../../elements';
// components
import Calendar from '../../../components/Calendar';
import AreaSelectBox from '../../../components/AreaSelectBox';
// reducer
import { MypageCreators } from '../../../redux/modules/mypage';
// style
import TabHeight from './style';

const CreateTrip = () => {
  const dispatch = useDispatch();

  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const [tripInfo, setTripInfo] = useState('');

  const createTripEvent = () => {
    const trip = {
      region,
      city,
      startDate: moment(date[0].startDate).format('YYYY-MM-DD'),
      endDate: moment(date[0].endDate).format('YYYY-MM-DD'),
      tripInfo,
    };

    dispatch(MypageCreators.CreateTripEventDB(trip));
  };

  useEffect(() => {
    setRegion('서울특별시');
    setCity('종로구');
  }, []);

  return (
    <>
      <MainTitle fs="sxl" margin="0 0 24px">
        여행 일자를 선택해주세요
      </MainTitle>

      <Calendar setSelectDate={setDate} />

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 12px">
          여행 장소를 선택해주세요
        </SubTitle>

        <AreaSelectBox toggle setCity={setRegion} setGu={setCity} />
      </Grid>

      <Grid margin="60px 0 30px">
        <SubTitle fs="la" margin="0 0 12px">
          본인이 원하는 여행을 소개해주세요
        </SubTitle>

        <TextArea
          value={tripInfo}
          _onChange={e => setTripInfo(e.target.value)}
          tab={TabHeight('170px')}
        />
      </Grid>

      <Button width="100%" fs="la" margin="0 0 40px" _onClick={createTripEvent}>
        등록하기
      </Button>
    </>
  );
};

export default CreateTrip;

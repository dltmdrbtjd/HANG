import React from 'react';
// date format
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
import { CreateTripEvent } from 'src/redux/modules/MyPageModule/mypage';
// history
import { history } from 'src/redux/configureStore';
// apis
import apis from 'src/shared/api';
// elements
import { Grid, MainTitle, SubTitle, Button, TextArea, Container } from '../../../elements';
// components
import Calendar from './Calendar';
import AreaSelectBox from '../../../components/AreaSelectBox';

const CreateTrip = () => {
  const dispatch = useDispatch();

  const today = new Date();

  const [region, setRegion] = React.useState('');
  const [city, setCity] = React.useState('');
  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(today.setDate(today.getDate() + 1)),
    },
  ]);
  const [tripInfo, setTripInfo] = React.useState('');

  const CreateTrip = () => {
    const trip = {
      region,
      city,
      startDate: moment(date[0].startDate).format('YYYY-MM-DD'),
      endDate: moment(date[0].endDate).format('YYYY-MM-DD'),
      tripInfo,
    };

    apis
      .CreateTripEvent(trip)
      .then(({ data }) => {
        dispatch(CreateTripEvent({ ...trip, tripId: data.newTripId }));
      })
      .then(() => {
        history.goBack();
      })
      .catch((err) => console.log(err.config));
  };

  React.useEffect(() => {
    setRegion('서울');
    setCity('강남구');
  }, []);

  return (
    <Container>
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
          _onChange={(e) => setTripInfo(e.target.value)}
        />
      </Grid>

      <Button width="100%" fs="la" margin="0 0 40px" _onClick={CreateTrip}>
        등록하기
      </Button>
    </Container>
  );
};

export default CreateTrip;

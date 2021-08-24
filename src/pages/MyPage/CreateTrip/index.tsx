import React from 'react';
// date format
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
import { CreateTripEvent } from 'src/redux/modules/MyPageModule/mypage';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// history
import { history } from 'src/redux/configureStore';
// apis
import apis from 'src/shared/api';
// elements
import {
  Grid,
  MainTitle,
  SubTitle,
  Button,
  TextArea,
  Container,
  Span,
} from '../../../elements';
// components
import Calendar from './Calendar';
import AreaSelectBox from '../../../components/AreaSelectBox';
import ToastMessage from '../../../components/ToastMessage';
// style
import { setMediaBoxSize } from '../../../styles/Media';

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
    if (!tripInfo) {
      dispatch(
        fetchMessage({
          Message: true,
          error: '소개 문구를 작성해주세요',
        }),
      );

      return;
    }

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
      .catch((err) => {
        if (err.response.status === 400) {
          dispatch(
            fetchMessage({
              Message: true,
              error: '해당 날짜에 이미 등록된 여행이 있습니다.',
            }),
          );
        }
      });
  };

  React.useEffect(() => {
    setRegion('서울');
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
          _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTripInfo(e.target.value)
          }
          addstyle={setMediaBoxSize(null, '170px')}
        />

        <Grid fs="xs" textAlign="right">
          {60 - tripInfo.length} / 60자
        </Grid>
      </Grid>

      <Button
        width="100%"
        fs="la"
        margin="0 0 40px"
        disabled={tripInfo.length > 60}
        _onClick={CreateTrip}
      >
        등록하기
      </Button>

      <ToastMessage msg="" />
    </Container>
  );
};

export default CreateTrip;

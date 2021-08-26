import React from 'react';
// date format
import moment from 'moment';
// redux
import { useDispatch } from 'react-redux';
import { CreateTripEvent } from 'src/redux/modules/MyPageModule/mypage';
import { activeAlert } from 'src/redux/modules/AlertModule/alert';
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
  Text,
} from '../../../elements';
// components
import Calendar from './Calendar';
import AreaSelectBox from '../../../components/AreaSelectBox';
import ToastMessage from '../../../components/ToastMessage';
import Tag from '../../../components/Tag';
import { tripKeyword } from '../../../components/Tag/tagList';
// style
import { setMediaBoxSize } from '../../../styles/Media';
import { limitWidth } from '../../../styles/Mixin';

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
        activeAlert({
          status: true,
          errorMsg: '소개 문구를 작성해주세요',
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
            activeAlert({
              status: true,
              errorMsg: '해당 날짜에 이미 등록된 여행이 있습니다.',
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

        <AreaSelectBox setCity={setRegion} setGu={setCity} />
      </Grid>

      <Grid margin="60px 0 0">
        <SubTitle fs="la" margin="0 0 18px">
          본인이 원하는 여행을 소개해주세요
        </SubTitle>

        <Grid margin="0 0 50px">
          <Grid isFlex hoz="space-between" ver="center" margin="0 0 12px">
            <SubTitle>여행 키워드</SubTitle>

            <Text fs="xs" color="darkGray">
              *3개까지 선택할 수 있어요
            </Text>
          </Grid>

          <Grid addstyle={limitWidth('500px')}>
            <Tag
              fs="sm"
              bgColor="white"
              cursor="pointer"
              tabFont="lg"
              padding="7px 19px"
              list={tripKeyword}
            />
          </Grid>
        </Grid>

        <Grid margin="0 0 24px">
          <SubTitle margin="0 0 12px">여행을 소개해주세요</SubTitle>

          <TextArea
            value={tripInfo}
            _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTripInfo(e.target.value)
            }
            addstyle={setMediaBoxSize(null, '170px')}
          />

          <Grid fs="xs" textAlign="right">
            {tripInfo.length} / 60자
          </Grid>
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

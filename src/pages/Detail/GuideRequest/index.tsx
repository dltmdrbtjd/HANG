import React from 'react';
// moment
import moment from 'moment';
// query
import queryString from 'query-string';
// redux
import { useDispatch, shallowEqual } from 'react-redux';
import { DetailCreators } from 'src/redux/modules/DetailModule/detail';
import { useTypedSelector, history } from 'src/redux/configureStore';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import { activeAlert } from 'src/redux/modules/AlertModule/alert';
// apis , socket
import apis from 'src/shared/api';
import socket from 'src/util/socket';
// style
import ToastMessage from 'src/components/ToastMessage';
import {
  Grid,
  MainTitle,
  Text,
  Button,
  Label,
  Container,
} from '../../../elements';
import { RadioBtn, maxWidth } from './style';
// components
import Modal from '../../../components/Modal';

const GuideRequest = () => {
  const dispatch = useDispatch();
  const { myPromise, userPk }: any = useTypedSelector(
    (state) => ({
      myPromise: state.detail.myTripInfo,
      userPk: state.detail.userInfo.userPk,
    }),
    shallowEqual,
  );

  const [checked, setChecked] = React.useState<number>(0);
  const [index, setIndex] = React.useState<number>(0);
  const [startDate, setStartDate] = React.useState<string>('');
  const [endDate, setEndDate] = React.useState<string>('');
  const [modal, setModal] = React.useState<boolean>(false);

  const openModalHandler = () => {
    setModal(true);
    setStartDate(
      moment
        .utc(myPromise[index].startDate)
        .add(9, 'hours')
        .format('YYYY-MM-DD'),
    );
    setEndDate(
      moment.utc(myPromise[index].endDate).add(9, 'hours').format('YYYY-MM-DD'),
    );
  };

  const agreeModalHandler = (userInfo) => {
    apis
      .GuideRequest(userInfo)
      .then(() => {
        socket.emit('request', { uid: userPk });
        dispatch(fetchMessage({ Message: true }));
        history.goBack();
      })
      .catch((err) => {
        dispatch(
          activeAlert({
            status: true,
            errorMsg: err.response.data.errorMessage,
          }),
        );
      });
    setModal(false);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const query = queryString.parse(location.search);
  const ModalMessage = `${query.nickname}님에게`;

  const promiseData = {
    pagePk: Number(query.user),
    tripId: checked,
    startDate,
    endDate,
  };

  React.useEffect(() => {
    dispatch(DetailCreators.fetctMyTripInfo());
    dispatch(fetchMessage({ Message: false }));
  }, []);

  return (
    <Container>
      <MainTitle fs="xl">나의 약속 리스트</MainTitle>
      {myPromise.length > 0
        ? myPromise.map((item, idx) => (
            <Grid
              isFlex
              ver="center"
              key={idx}
              padding="20px 0"
              border="0.5px solid #E7E7E7"
              borDirection="bottom"
            >
              <Grid width="auto">
                <RadioBtn
                  type="radio"
                  id={item.city}
                  name="city"
                  checked={checked === item.tripId}
                  onChange={() => {
                    setChecked(item.tripId);
                    setIndex(idx);
                  }}
                />
              </Grid>
              <Label id={item.city}>
                <Text fs="sm">
                  {moment.utc(item.startDate).add(9, 'hours').format('MM. DD')}{' '}
                  - {moment.utc(item.endDate).add(9, 'hours').format('MM. DD')}
                </Text>
                <Text fs="la" fw="bold">
                  {item.region} {item.city}
                </Text>
              </Label>
            </Grid>
          ))
        : '등록하신 약속이 없어요!'}
      <Grid
        width="90%"
        position="fixed"
        bottom="120px"
        left="50%"
        translate="-50%,0"
        addstyle={maxWidth}
      >
        <Button
          padding="16px 0"
          width="100%"
          disabled={myPromise.length > 0 ? '' : 'disabled'}
          _onClick={openModalHandler}
        >
          선택 완료
        </Button>
      </Grid>
      <Modal
        open={modal}
        close={closeModalHandler}
        agree={() => {
          agreeModalHandler(promiseData);
        }}
        mainText="길잡이 부탁하기"
        subText={ModalMessage}
        subText2="길잡이를 부탁하시겠습니까?"
      />
      <ToastMessage msg="" />
    </Container>
  );
};

export default GuideRequest;

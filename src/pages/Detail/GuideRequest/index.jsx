import React, { useState, useEffect } from 'react';
// moment
import moment from 'moment';
// query
import queryString from 'query-string';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../../../redux/configureStore';
import { DetailCreators } from '../../../redux/modules/detail';
// style
import { Grid, MainTitle, Text, Button } from '../../../elements';
import RadioBtn from './style';
// components
import Modal from '../../../components/Modal';

const GuideRequest = () => {
  const dispatch = useDispatch();
  const myPromise = useSelector(state => state.detail.myTripInfo);
  const userPk = useSelector(state => state.detail.userInfo.userPk);

  const [checked, setChecked] = useState(0);
  const [index, setIndex] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [modal, setModal] = useState(false);

  const openModalHandler = () => {
    setModal(true);
    setStartDate(moment.utc(myPromise[index].startDate).format('YYYY-MM-DD'));
    setEndDate(moment.utc(myPromise[index].endDate).format('YYYY-MM-DD'));
  };

  const agreeModalHandler = userInfo => {
    dispatch(DetailCreators.AddTravel(userInfo, userPk));
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
  useEffect(() => {
    dispatch(DetailCreators.MyTripInfoDB());
  }, []);
  return (
    <>
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
              <label id={item.city}>
                <Text fs="sm">
                  {moment.utc(item.startDate).format('MM. DD')} -{' '}
                  {moment.utc(item.endDate).format('MM. DD')}
                </Text>
                <Text fs="la" fw="bold">
                  {item.region} {item.city}
                </Text>
              </label>
            </Grid>
          ))
        : '등록하신 약속이 없어요!'}
      <Grid
        width="90%"
        position="fixed"
        bottom="120px"
        left="50%"
        translate="-50%,0"
        maxWidth="600px"
        tab="max-width: 768px"
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
        subText={ModalMessage}
        subText2="길잡이를 부탁하시겠습니까?"
      />
    </>
  );
};

export default GuideRequest;

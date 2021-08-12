import React, { useState, useEffect } from 'react';
// moment
import moment from 'moment';
// component
import { useSelector } from 'react-redux';
import ToastMessage from '../ToastMessage';
import Modal from '../Modal';

import { Grid, Text, MainTitle, Button } from '../../elements';
// style
import TabSize from './style';
import { textOverflowWrap } from '../../styles/Mixin';

const EventCard = ({ userInfo, ...props }) => {
  const { sub2Text, btnText, toastMessage, mainText, agreeText, callback } =
    props;
  const [toastMsg, setToastMsg] = useState(false);
  const [modal, setModal] = useState(false);
  const success = useSelector(state => state.detail.success);

  const openModalHandler = () => {
    setModal(true);
  };
  const agreeModalHandler = () => {
    callback();
    setModal(false);
    setToastMsg(success);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  useEffect(() => {
    if (toastMsg) {
      setTimeout(() => {
        setToastMsg(false);
      }, 1500);
    }
  }, [toastMsg]);
  return (
    <Grid
      tab={TabSize}
      margin="10px 0 20px"
      bgColor="white"
      radius="14px"
      position="relative"
      overflow="hidden"
    >
      <Grid padding="20px">
        <Text>
          {userInfo && moment.utc(userInfo.startDate).format('MM. DD')} -{' '}
          {userInfo && moment.utc(userInfo.endDate).format('MM. DD')}
        </Text>
        <MainTitle fs="la">
          {userInfo && userInfo.region} {userInfo && userInfo.city}
        </MainTitle>
        <Text margin="10px 0 0 0" fs="sm" addstyle={textOverflowWrap(3)}>
          {userInfo && userInfo.tripInfo}
        </Text>
        <Modal
          open={modal}
          close={closeModalHandler}
          agree={agreeModalHandler}
          mainText={mainText}
          subText={userInfo && userInfo.nickname}
          subText2={sub2Text}
          agreeText={agreeText}
        />
        {toastMsg && <ToastMessage msg={toastMessage} />}
      </Grid>
      <Button
        width="100%"
        radius="0"
        _onClick={() => {
          openModalHandler(userInfo.tripId);
        }}
      >
        {btnText}
      </Button>
    </Grid>
  );
};

EventCard.defaultProps = {
  callback: () => {},
};

export default EventCard;

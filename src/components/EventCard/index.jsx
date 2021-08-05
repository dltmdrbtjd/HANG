import React, { useState, useEffect } from 'react';
// moment
import moment from 'moment';
// component
import ToastMessage from '../ToastMessage';
import Modal from '../Modal';
// style
import { Grid, Text, MainTitle, Button } from '../../elements';

const EventCard = ({ userInfo, ...props }) => {
  const { sub2Text, btnText, toastMessage } = props;
  const [toastMsg, setToastMsg] = useState(false);
  const [modal, setModal] = useState(false);

  const openModalHandler = () => {
    setModal(true);
  };
  const agreeModalHandler = () => {
    setModal(false);
    setToastMsg(true);
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
    <>
      <Grid
        padding="20px 20px"
        margin="10px 0 0 0"
        radius="14px 14px 0 0"
        bgColor="white"
        shadow="0 4px 4px rgba(134, 134, 134, 0.3)"
      >
        <Text>
          {userInfo && moment.utc(userInfo.startDate).format('MM.DD')} ~{' '}
          {userInfo && moment.utc(userInfo.endDate).format('MM.DD')}
        </Text>
        <MainTitle fs="la">
          {userInfo && userInfo.region} {userInfo && userInfo.city}
        </MainTitle>
        <Text margin="10px 0 0 0" fs="sm">
          {userInfo && userInfo.tripInfo}
        </Text>
        <Modal
          open={modal}
          close={closeModalHandler}
          agree={agreeModalHandler}
          subText={userInfo && userInfo.nickname}
          subText2={sub2Text}
        />
        {toastMsg && <ToastMessage msg={toastMessage} />}
      </Grid>
      <Button
        margin="0 0 20px 0"
        radius="0 0 14px 14px"
        width="100%"
        _onClick={openModalHandler}
      >
        {btnText}
      </Button>
    </>
  );
};

export default EventCard;

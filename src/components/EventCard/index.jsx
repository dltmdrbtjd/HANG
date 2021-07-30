import React, { useState, useEffect } from 'react';

// component
import ToastMessage from '../ToastMessage';
import Modal from '../Modal';
// style
import { Grid, Text, MainTitle, Button } from '../../elements';

const EventCard = ({ date, city, text }) => {
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
    <Grid
      padding="20px 20px"
      margin="10px 0 10px 0"
      radius="14px"
      bgColor="white"
      shadow="0 4px 4px rgba(134, 134, 134, 0.3)"
    >
      <Text>{date}</Text>
      <MainTitle fs="la">{city}</MainTitle>
      <Text margin="10px 0 0 0" fs="sm">
        {text}
      </Text>
      <Button margin="12px 0 0 0" width="100%" _onClick={openModalHandler}>
        길잡이 되어주기
      </Button>
      <Modal open={modal} close={closeModalHandler} agree={agreeModalHandler} />
      {toastMsg && <ToastMessage msg="길잡이 신청이 완료되었습니다!" />}
    </Grid>
  );
};

export default EventCard;

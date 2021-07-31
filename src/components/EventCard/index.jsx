import React, { useState, useEffect } from 'react';

// component
import ToastMessage from '../ToastMessage';
import Modal from '../Modal';
// style
import { Grid, Text, MainTitle, Button } from '../../elements';

const EventCard = ({
  date,
  city,
  text,
  subText,
  sub2Text,
  btnText,
  toastMessage,
}) => {
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
        <Text>{date}</Text>
        <MainTitle fs="la">{city}</MainTitle>
        <Text margin="10px 0 0 0" fs="sm">
          {text}
        </Text>
        <Modal
          open={modal}
          close={closeModalHandler}
          agree={agreeModalHandler}
          subText={subText}
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

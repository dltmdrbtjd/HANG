import React, { useState } from 'react';

// redux
import { history } from '../../../redux/configureStore';
// style
import { Grid, MainTitle, Text, Button } from '../../../elements';
import RadioBtn from './style';
// components
import Modal from '../../../components/Modal';

const GuideRequest = () => {
  const [checked, setChecked] = useState(0);
  const [modal, setModal] = useState(false);

  const openModalHandler = () => {
    setModal(true);
  };
  const agreeModalHandler = () => {
    setModal(false);
    history.goBack();
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const myPromise = [
    { city: 'seoul', promise: '서울에갑니다', date: '07.25 ~ 07.26' },
    { city: 'busan', promise: '부산에갑니다.', date: '08.10 ~ 08.15' },
    { city: '제주도', promise: '제주도간드아!!', date: '09.11 ~ 09.12' },
  ];
  return (
    <>
      <MainTitle fs="xl">나의 약속 리스트</MainTitle>
      {myPromise.map((item, idx) => (
        <Grid
          display="flex"
          hoz="flex-start"
          ver="center"
          key={idx}
          padding="20px 0"
          borderbot="1px solid #c4c4c4"
        >
          <Grid width="auto">
            <RadioBtn
              type="radio"
              id={item.city}
              name="city"
              checked={checked === idx}
              onChange={() => {
                setChecked(idx);
              }}
            />
          </Grid>
          <label id={item.city}>
            <Text>{item.date}</Text>
            <Text>{item.promise}</Text>
          </label>
        </Grid>
      ))}
      <Grid position="fixed" bottom="90px" left="0">
        <Button
          padding="16px 0"
          radius="none"
          width="100%"
          _onClick={openModalHandler}
        >
          선택 완료
        </Button>
      </Grid>
      <Modal
        open={modal}
        close={closeModalHandler}
        agree={agreeModalHandler}
        subText="dltmdrbtjd님에게"
        subText2="길잡이를 부탁하시겠습니까?"
      />
    </>
  );
};

export default GuideRequest;

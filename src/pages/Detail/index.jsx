import React, { useState, useEffect } from 'react';
// style
import { useSelector } from 'react-redux';
import { Grid, MainTitle, Button } from '../../elements';
import { history } from '../../redux/configureStore';
// redux

// component
import ProfileCard from '../../components/ProfileCard';
import EventCard from '../../components/EventCard';
import ToastMessage from '../../components/ToastMessage';

const Detail = () => {
  const { eventList, userInfo } = useSelector(state => ({
    eventList: state.detail.tripInfo,
    userInfo: state.detail.userInfo,
  }));
  const [toastMsg, setToastMsg] = useState(false);

  const GuideHandler = () => {
    history.push('/detail/request');
  };

  useEffect(() => {
    if (toastMsg) {
      setTimeout(() => {
        setToastMsg(false);
      }, 1500);
    }
  }, [toastMsg]);

  return (
    <Grid>
      <MainTitle fs="xl">프로필</MainTitle>
      <ProfileCard userInfo={userInfo} />
      <Button margin="24px 0 60px 0" width="100%" _onClick={GuideHandler}>
        길잡이 부탁하기
      </Button>
      <MainTitle fs="sxl">dltmdrbtjd님의 여행 이벤트</MainTitle>
      <EventCard
        userInfo={eventList}
        sub2Text="길잡이가 되어주시겠습니까?"
        btnText="길잡이 되어주기"
        toastMessage="길잡이 신청이 완료되었습니다."
      />
      {toastMsg && <ToastMessage msg="길잡이 부탁이 완료되었습니다!" />}
    </Grid>
  );
};

export default Detail;

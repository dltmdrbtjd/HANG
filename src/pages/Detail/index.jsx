import React, { useState, useEffect } from 'react';
// style
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import queryString from 'query-string';
import { Grid, MainTitle, Button } from '../../elements';
import { history } from '../../redux/configureStore';
import { DetailCreators } from '../../redux/modules/detail';
// redux
// component
import ProfileCard from '../../components/ProfileCard';
import EventCard from '../../components/EventCard';
import ToastMessage from '../../components/ToastMessage';

const Detail = () => {
  const dispatch = useDispatch();
  const { eventList, userInfo, success } = useSelector(
    state => ({
      eventList: state.detail.tripInfo,
      userInfo: state.detail.userInfo,
      success: state.detail.success,
    }),
    shallowEqual,
  );

  const [toastMsg, setToastMsg] = useState(success);

  const GuideHandler = () => {
    history.push(
      `/detail/request?user=${userInfo.userPk}&nickname=${userInfo.nickname}`,
    );
  };

  const query = queryString.parse(location.search);

  const TraveleRequestHandler = pk => {
    dispatch(DetailCreators.AddGuide(pk));
  };

  useEffect(() => {
    dispatch(DetailCreators.DetailLoadDB(query.user));
    dispatch(DetailCreators.SuccessValue(false));
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
      <MainTitle fs="sxl">{userInfo.nickname}님의 여행 이벤트</MainTitle>
      {eventList
        ? eventList.map((item, idx) => {
            return (
              <EventCard
                key={idx}
                userInfo={item}
                sub2Text="길잡이가 되어주시겠습니까?"
                btnText="길잡이 되어주기"
                toastMessage="길잡이 신청이 완료되었습니다."
                callback={() => {
                  TraveleRequestHandler(item.tripId);
                }}
              />
            );
          })
        : ''}
      {toastMsg && <ToastMessage msg="길잡이 부탁이 완료되었습니다!" />}
    </Grid>
  );
};

export default Detail;

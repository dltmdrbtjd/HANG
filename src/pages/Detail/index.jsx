import React, { useState, useEffect } from 'react';
// style
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import queryString from 'query-string';
import { Grid, MainTitle, Button, Image } from '../../elements';
import { history } from '../../redux/configureStore';
import { DetailCreators } from '../../redux/modules/detail';
import { ToastCreators } from '../../redux/modules/toastMessage';
// redux
// component
import ProfileCard from '../../components/ProfileCard';
import EventCard from '../../components/EventCard';
import ToastMessage from '../../components/ToastMessage';
// style
import { TabEventWrapper } from '../MyPage/MyInfo/style';
// image
import chat from '../../Images/NavigationIcons/onchat.svg';

const Detail = () => {
  const dispatch = useDispatch();

  const { eventList, userInfo, message } = useSelector(
    state => ({
      eventList: state.detail.tripInfo,
      userInfo: state.detail.userInfo,
      message: state.toastMessage.Message,
    }),
    shallowEqual,
  );

  const GuideHandler = () => {
    history.push(
      `/detail/request?user=${userInfo.userPk}&nickname=${userInfo.nickname}`,
    );
  };

  const query = queryString.parse(location.search);

  const TraveleRequestHandler = (pk, userPk) => {
    dispatch(DetailCreators.AddGuide(pk, userPk));
  };

  useEffect(() => {
    dispatch(DetailCreators.DetailLoadDB(query.user));
    if (message) {
      setTimeout(() => {
        dispatch(ToastCreators.Message(false));
      }, 1500);
    }
  }, [message]);

  return (
    <Grid>
      <MainTitle fs="xl">프로필</MainTitle>
      <ProfileCard userInfo={userInfo} />
      <Grid isFlex hoz="flex-end" margin="17px 0 60px 0">
        <Button
          width="48px"
          height="48px"
          radius="50%"
          bgColor="white"
          border="0.5px solid #E7E7E7"
          padding="10px 9px"
          margin="0 7px 0 0"
          _onClick={() => history.push(`/chat/room?number=${query.user}`)}
        >
          <Image src={chat} alt="chat icon" />
        </Button>

        <Button padding="14px 18px" _onClick={GuideHandler}>
          길잡이 부탁하기
        </Button>
      </Grid>
      <MainTitle fs="sxl">{userInfo.nickname}님의 여행 이벤트</MainTitle>
      {eventList ? (
        <Grid tab={TabEventWrapper}>
          {eventList.map((item, idx) => {
            return (
              <EventCard
                key={idx}
                userInfo={item}
                sub2Text="길잡이가 되어주시겠습니까?"
                btnText="길잡이 되어주기"
                callback={() => {
                  TraveleRequestHandler(item.tripId, item.userPk);
                }}
              />
            );
          })}
        </Grid>
      ) : null}
      {message && <ToastMessage msg="신청이 완료되었습니다." />}
    </Grid>
  );
};

export default Detail;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import queryString from 'query-string';
import { history } from '../../redux/configureStore';
// style
import { Grid, MainTitle, Button, Image } from '../../elements';
import { DetailCreators } from '../../redux/modules/detail';
import { ChatCreators } from '../../redux/modules/chat';
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

  const chooseChatRoom = () => {
    dispatch(
      ChatCreators.ChooseChatRoom({
        nickname: userInfo.nickname,
        profileImg: userInfo.profileImg,
      }),
    );

    history.push(`/chat/room?number=${query.user}`);
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
      <Grid isFlex hoz="flex-end" margin="17px 0 60px 0">
        <Button
          width="48px"
          height="48px"
          radius="50%"
          bgColor="white"
          border="0.5px solid #E7E7E7"
          padding="10px 9px"
          margin="0 7px 0 0"
          _onClick={chooseChatRoom}
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
                toastMessage="길잡이 신청이 완료되었습니다."
                callback={() => {
                  TraveleRequestHandler(item.tripId);
                }}
              />
            );
          })}
        </Grid>
      ) : null}
      {toastMsg && <ToastMessage msg="길잡이 부탁이 완료되었습니다!" />}
    </Grid>
  );
};

export default Detail;

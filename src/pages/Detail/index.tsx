import React from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import queryString from 'query-string';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import { DetailCreators } from 'src/redux/modules/DetailModule/detail';
import apis from 'src/shared/api';
import socket from 'src/shared/socket';
// redux
import { ChooseChatRoom } from 'src/redux/modules/ChatModule/chat';
import { history, useTypedSelector } from '../../redux/configureStore';
// style
import { Grid, MainTitle, Button, Image, Container } from '../../elements';
// component
import ProfileCard from '../../components/ProfileCard';
import EventCard from '../../components/EventCard';
import ToastMessage from '../../components/ToastMessage';
// style
// import { TabEventWrapper } from '../MyPage/MyInfo/style';
// image
import chat from '../../Images/NavigationIcons/onchat.svg';

const Detail = () => {
  const dispatch = useDispatch();

  const [toast, setToast] = React.useState<number>(0);

  const { eventList, userInfo, message }: any = useTypedSelector(
    (state) => ({
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
    apis
      .DoGuide({ tripId: pk })
      .then(() => {
        socket.emit('request', { uid: userPk });
        dispatch(fetchMessage({ Message: true }));
      })
      .catch((err) => {
        dispatch(
          fetchMessage({
            Message: true,
            error: err.response.data.errorMessage,
          }),
        );
      });
  };

  const chooseChatRoom = () => {
    dispatch(
      ChooseChatRoom({
        nickname: userInfo.nickname,
        profileImg: userInfo.profileImg,
        targetPk: parseInt(query.user as string, 10),
      }),
    );

    history.push(`/chat/room`);
  };

  React.useEffect(() => {
    dispatch(DetailCreators.fetchDetailLoad(query.user));
  }, []);

  return (
    <Container>
      <Grid>
        <MainTitle fs="xl">프로필</MainTitle>
        <ProfileCard userInfo={userInfo} setToast={setToast} />
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
        <MainTitle fs="sxl">
          {userInfo && userInfo.nickname}님의 여행 이벤트
        </MainTitle>
        {eventList ? (
          <Grid>
            {eventList.map((item, idx) => {
              return (
                <EventCard
                  key={idx}
                  userInfo={item}
                  subText={`${userInfo.nickname}님의`}
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
        {message && (
          <ToastMessage
            msg={
              toast === 1
                ? '관식목록에 추가되었습니다'
                : '신청이 완료되었습니다'
            }
          />
        )}
      </Grid>
    </Container>
  );
};

export default Detail;

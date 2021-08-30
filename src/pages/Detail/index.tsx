import React from 'react';
import { useDispatch, shallowEqual } from 'react-redux';
import queryString from 'query-string';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
import { DetailCreators } from 'src/redux/modules/DetailModule/detail';
import { activeAlert } from 'src/redux/modules/AlertModule/alert';
import apis from 'src/shared/api';
// user info
import { setUserInfo, delUserInfo, getUserInfo } from 'src/shared/userInfo';
import Dropdown from 'src/components/DropDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// redux
import { socket } from 'src/util/socket';
import { AddBlockList } from 'src/redux/modules/MyPageModule/mypage';
import { history, useTypedSelector } from '../../redux/configureStore';
// style
import {
  Grid,
  MainTitle,
  Button,
  Image,
  Container,
  Text,
} from '../../elements';
import NotFoundImage from './style';
// component
import ProfileCard from '../../components/ProfileCard';
import EventCard from '../../components/EventCard';
// style
import { setMediaCardLayout } from '../../styles/Media';
// image
import chat from '../../Images/NavigationIcons/onchat.svg';

const Detail = () => {
  const dispatch = useDispatch();

  const { eventList, userInfo }: any = useTypedSelector(
    (state) => ({
      eventList: state.detail.tripInfo,
      userInfo: state.detail.userInfo,
    }),
    shallowEqual,
  );

  const query = queryString.parse(location.search);
  const { userPk } = getUserInfo('userInfo');
  const targetPk = query.user;

  function BlockRoom() {
    socket.emit('quit', { userPk, targetPk });
    delUserInfo('targetUserInfo');
    history.goBack();
  }

  function BlockUser() {
    apis
      .AddBlockList({ targetPk })
      .then(() => apis.LikeToggle({ targetPk, block: 1 }))
      .then(() => dispatch(AddBlockList({ ...userInfo, userPk: targetPk })))
      .then(() => BlockRoom())
      .catch((err) => console.log(err));
  }

  const GuideHandler = () => {
    history.push(
      `/detail/request?user=${userInfo.userPk}&nickname=${userInfo.nickname}`,
    );
  };

  const TraveleRequestHandler = (pk, userPk) => {
    apis
      .DoGuide({ tripId: pk })
      .then(() => {
        socket.emit('request', { uid: userPk });
        dispatch(
          fetchMessage({ Message: true, text: '신청이 완료되었습니다.' }),
        );
      })
      .catch((err) => {
        dispatch(
          activeAlert({
            status: true,
            errorMsg: err.response.data.errorMessage,
          }),
        );
      });
  };

  const chooseChatRoom = () => {
    setUserInfo('targetUserInfo', {
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      targetPk: parseInt(query.user as string, 10),
    });

    history.push('/chat/room');
  };

  React.useEffect(() => {
    dispatch(DetailCreators.fetchDetailLoad(query.user));
  }, []);

  return (
    <Container>
      <Grid>
        <Grid isFlex hoz="space-between" ver="center">
          <MainTitle fs="xl">프로필</MainTitle>
          <Dropdown
            icon={<MoreVertIcon />}
            contents={['차단하기']}
            methods={[BlockUser]}
          />
        </Grid>
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
          <Button
            padding="14px 18px"
            _onClick={GuideHandler}
            disabled={!(userInfo && userInfo.guide)}
          >
            길잡이 부탁하기
          </Button>
        </Grid>
        <MainTitle fs="sxl">
          {userInfo && userInfo.nickname}님의 여행 이벤트
        </MainTitle>
        {eventList ? (
          <Grid addstyle={setMediaCardLayout()}>
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
        {eventList.length < 1 ? (
          <>
            <Image
              src="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/eventnotfound.png"
              addstyle={NotFoundImage}
            />
            <Text textAlign="center">등록된 여행 이벤트가 없습니다.</Text>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};

export default Detail;

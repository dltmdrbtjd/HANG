import React from 'react';
// icon
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SettingsIcon from '@material-ui/icons/Settings';
// apis
import apis from 'src/shared/api';
// redux
import { useDispatch, shallowEqual } from 'react-redux';
import { DeleteTripEvent } from 'src/redux/modules/MyPageModule/mypage';
import { fetchMessage } from 'src/redux/modules/ToastMessage/toastMessage';
// sign out
import { signInStatus } from 'src/context/signInContext';
// token
import { getUserInfo } from 'src/shared/userInfo';
// type
import { DeleteTripEventType } from 'src/shared/ApiTypes';
// history
import io from 'socket.io-client';
import { socket } from 'src/util/socket';
import { history, useTypedSelector } from '../../../redux/configureStore';
// elements
import {
  Grid,
  SubTitle,
  Strong,
  Button,
  MainTitle,
  Ul,
  List,
  Container,
} from '../../../elements';
// components
import ProfileCard from '../../../components/ProfileCard';
import GuideToggle from '../GuideToggle';
import EventCard from '../../../components/EventCard';
import DropDown from '../../../components/DropDown';
import NoInfo from '../../../components/NoInfo';
import Modal from '../../../components/Modal';
// style
import { setSubTitleFont, setNicknameFont } from './style';
import { setMediaCardLayout } from '../../../styles/Media';

// const socket = io('https://soujinko.shop');

const MyInfo = () => {
  const dispatch = useDispatch();

  const { myInfo, tripList }: any = useTypedSelector(
    (state) => ({
      myInfo: state.mypage.myInfo,
      tripList: state.mypage.tripList,
    }),
    shallowEqual,
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const { userPk } = getUserInfo('userInfo');

  const { signOut } = React.useContext(signInStatus);

  const deleteUserInfo = () => {
    socket.emit('logout', { uid: userPk });
    socket.disconnect();
    signOut();
  };

  const DeleteTrip = (tripId: DeleteTripEventType) => {
    apis
      .DeleteTripEvent(tripId)
      .then(() => {
        dispatch(DeleteTripEvent(tripId.tripId));
        dispatch(
          fetchMessage({
            Message: true,
            text: '여행 이벤트가 삭제되었습니다.',
          }),
        );
      })
      .catch((err) => console.log(err));
  };

  const SignOut = () => {
    apis
      .SignOut()
      .then(() => deleteUserInfo())
      .then(() => history.replace('/signin'))
      .catch((err) => console.error(err));
  };

  const WithDrawalUser = () => {
    apis
      .Withdrawal()
      .then(() => deleteUserInfo())
      .then(() => history.replace('/signin'))
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Grid isFlex ver="center" hoz="space-between" margin="0 0 16px">
        <Ul isFlex>
          <List _onClick={() => history.push('/mypage')}>
            <MainTitle width="auto" fs="sxl" color="black">
              프로필
            </MainTitle>
          </List>

          <List _onClick={() => history.push('/mypage/promise')}>
            <MainTitle fs="sxl" width="auto" margin="0 0 0 20px" color="gray">
              나의 약속
            </MainTitle>
          </List>
        </Ul>

        <DropDown
          icon={<SettingsIcon />}
          contents={[
            '프로필 수정',
            '차단 목록',
            '로그아웃',
            '회원 탈퇴',
            '튜토리얼 보기',
          ]}
          methods={[
            () => history.push('/mypage/modify'),
            () => history.push('/mypage/block'),
            SignOut,
            () => setOpen(true),
            () => history.push('/tutorial'),
          ]}
          top="130px"
        />
      </Grid>

      <ProfileCard userInfo={myInfo} />

      <Grid isFlex hoz="space-between" margin="60px 0 0" ver="center">
        <SubTitle fs="la" fw="bold" width="auto">
          길잡이 설정
        </SubTitle>

        <GuideToggle active={myInfo.guide} />
      </Grid>

      <Grid margin="60px 0 15px" isFlex hoz="space-between">
        <SubTitle fs="la" fw="bold" width="auto" addstyle={setSubTitleFont}>
          <Strong addstyle={setNicknameFont}>{myInfo.nickname}</Strong> 님의
          여행 이벤트
        </SubTitle>

        <Button
          isFlex
          ver="center"
          form="text"
          fs="xs"
          fw="regular"
          color="darkGray"
          _onClick={() => history.push('/mypage/create_trip')}
        >
          등록하기 <ControlPointIcon style={{ marginLeft: '4px' }} />
        </Button>
      </Grid>

      <NoInfo
        list={tripList}
        contents="등록된 여행 이벤트가 없습니다."
        imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/eventnotfound.png"
        staticBox
        margin="60px 0"
      >
        <Grid margin="0 0 60px" addstyle={setMediaCardLayout()}>
          {tripList.map((tripInfo, idx: number) => (
            <EventCard
              key={(idx * Date.now() + Math.random()).toString(36)}
              btnText="삭제하기"
              userInfo={tripInfo}
              mainText="여행 이벤트 삭제하기"
              sub2Text="여행 이벤트를 삭제하시겠습니까?"
              agreeText="삭제"
              callback={() => {
                DeleteTrip({ tripId: tripInfo.tripId });
                dispatch(
                  fetchMessage({
                    Message: false,
                  }),
                );
              }}
            />
          ))}
        </Grid>
      </NoInfo>

      <Modal
        open={open}
        close={() => setOpen(false)}
        mainText="회원 탈퇴"
        subText2="탈퇴 하시겠습니까?"
        agreeText="확인"
        agree={WithDrawalUser}
      />
    </Container>
  );
};

export default MyInfo;

import React from 'react';
// moment
import moment from 'moment';
// apis
import apis from 'src/shared/api';
// redux
import { useDispatch } from 'react-redux';
import { AddBlockList } from 'src/redux/modules/MyPageModule/mypage';
// history
import { history } from 'src/redux/configureStore';
// user info
import { delUserInfo, getUserInfo } from 'src/shared/userInfo';
// socket
import { socket } from 'src/util/socket';
import { chatStatus } from '../ChatContext';
// elements
import { Grid, Text, Container } from '../../../../elements';
// component
import RoomHeader from '../RoomHeader';
import SpeechBubble from '../SpeechBubble';
import ChatTextArea from '../ChatTextArea';
import Modal from '../../../../components/Modal';
// style
import { WarningText } from '../style';

const weekdays = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

const ChatRoomWrapper = () => {
  const { roomName } = React.useContext(chatStatus);
  const [open, setOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const targetUserInfo = getUserInfo('targetUserInfo');
  const { userPk } = getUserInfo('userInfo');
  const { targetPk, nickname } = targetUserInfo;

  const QuitRoom = () => {
    socket.emit('quit', { roomName, userPk });
    delUserInfo('targetUserInfo');

    history.replace('/chat');
  };

  const BlockUser = () => {
    apis
      .AddBlockList({ targetPk })
      .then(() => apis.LikeToggle({ targetPk, block: 1 }))
      .then(() =>
        dispatch(AddBlockList({ ...targetUserInfo, userPk: targetPk })),
      )
      .then(() => QuitRoom())
      .catch((err) => console.log(err));
  };

  const { inputBoxHeightState, chatLogState } = React.useContext(chatStatus);

  const date = chatLogState.chatLogs[0]
    ? moment(chatLogState.chatLogs[0].curTime)
    : moment();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ block: 'end' });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [chatLogState.chatLogs, inputBoxHeightState.inputBoxHeight]);

  return (
    <>
      <RoomHeader methods={[QuitRoom, () => setOpen(true)]} />

      <div ref={containerRef}>
        <Container>
          <Grid margin={`0 0 ${inputBoxHeightState.inputBoxHeight}px`}>
            <Text
              fs="xs"
              wb="keep-all"
              color="darkG"
              padding="10px 12px"
              ls="-0.5px"
              addstyle={WarningText}
            >
              매너있는 채팅 부탁드립니다.
              <br />
              약속을 일방적으로 파기하거나 지키지 않을 경우 제재 대상이 될 수
              있습니다.
            </Text>

            <Text fs="xs" textAlign="center" margin="0 0 20px">
              {`${date.format('YYYY년 M월 D일')} ${weekdays[date.days()]}`}
            </Text>

            <SpeechBubble />

            <ChatTextArea />
          </Grid>
        </Container>
      </div>

      <Modal
        open={open}
        close={() => setOpen(false)}
        mainText="차단하기"
        subText={`${nickname} 님을`}
        subText2="차단 하시겠습니까?"
        agreeText="확인"
        agree={BlockUser}
      />
    </>
  );
};

export default React.memo(ChatRoomWrapper);

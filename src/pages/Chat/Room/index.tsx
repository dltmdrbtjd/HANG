import React from 'react';
// redux
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  DeleteChatRoom,
  ChatAlarmCheck,
  getUnchecked,
} from 'src/redux/modules/ChatModule/chat';
// query string
import queryString from 'query-string';
// socket
import socket from 'src/util/socket';
// apis
import apis from 'src/shared/api';
// moment
import moment from 'moment';
// history
import { history, useTypedSelector } from '../../../redux/configureStore';
// user info
import { getUserInfo } from '../../../shared/userInfo';
// elements
import { Grid, Text, Input, Button, Container } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
import Modal from '../../../components/Modal';
// style
import { WarningText, ChatInputAreaSize } from './style';
import { setMediaLimitBoxSize } from '../../../styles/Media';

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { alarmCount, targetUserInfo } = useTypedSelector(
    (state) => ({
      alarmCount: state.chat.alarmCount,
      targetUserInfo: state.chat.targetUserInfo,
    }),
    shallowEqual,
  );
  const unchecked: number = useSelector(getUnchecked);

  const { userPk, nickname } = getUserInfo();

  const [chatLog, setChatLog] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const messageRef = React.useRef(null);

  const roomNumber = queryString.parse(location.search).number as string;
  const targetUserPk = parseInt(roomNumber, 10);

  const roomName =
    (userPk < targetUserPk && `${userPk}:${targetUserPk}`) ||
    `${targetUserPk}:${userPk}`;

  const QuitRoom = () => {
    socket.emit('ByeBye', { roomName, userPk });
    dispatch(DeleteChatRoom(targetUserPk));

    history.replace('/chat');
  };

  const BlockUser = async () => {
    apis
      .AddBlockList({ targetPk: targetUserPk })
      .then(() => QuitRoom())
      .catch((err) => console.log(err));
  };

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ block: 'end' });
    }
  };

  React.useEffect(() => {
    if (alarmCount > 0) dispatch(ChatAlarmCheck(alarmCount - unchecked));

    socket.emit('join', { joiningUserPk: userPk, targetUserPk, nickname });

    socket.on('chatLogs', (logs) => {
      const addedChatLog = logs.chatLogs.map((log) => JSON.parse(log));

      setChatLog(addedChatLog);
    });

    return () => {
      socket.emit('leave', { roomName, userPk });
    };
  }, []);

  React.useEffect(() => {
    socket.on('updateMessage', (data) => {
      setChatLog([...chatLog, data]);
    });

    scrollToBottom();
  }, [chatLog]);

  const sendMessage = () => {
    if (message) {
      socket.emit('sendMessage', {
        roomName,
        targetPk: targetUserPk,
        message,
        userPk,
      });

      setMessage('');
    }
  };

  const DATEFORMAT = 'YYYY년 M월 D일';
  const weekdays = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const date = chatLog[0] ? moment(chatLog[0].curTime) : moment();

  return (
    <div ref={messageRef}>
      <Container>
        <Grid margin="0 0 95px">
          <RoomHeader
            methods={[QuitRoom, () => setOpen(true)]}
            targetUserInfo={targetUserInfo}
          />

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
            {`${date.format(DATEFORMAT)} ${weekdays[date.days()]}`}
          </Text>

          {chatLog.map((chat, idx) => (
            <SpeechBubble
              person={userPk === chat.userPk}
              next={
                idx < chatLog.length - 1
                  ? chat.userPk === chatLog[idx + 1].userPk
                  : false
              }
              key={(Date.now() + Math.random() + idx).toString(36)}
            >
              {chat.message}
            </SpeechBubble>
          ))}

          <Grid
            position="fixed"
            bottom="110px"
            left="50%"
            translate="-50%, 0"
            width="90%"
            radius="12px"
            bgColor="white"
            border="1px solid #E7E7E7"
            isFlex
            hoz="space-between"
            ver="center"
            addstyle={setMediaLimitBoxSize('768px')}
          >
            <Input
              placeholder="채팅 내용 입력"
              border="none"
              value={message}
              addstyle={ChatInputAreaSize}
              _onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
              _onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === 'Enter' ? sendMessage() : null
              }
            />

            <Button
              padding="6px 15px"
              margin="0 9px 0 0"
              _onClick={() => sendMessage()}
            >
              전송
            </Button>
          </Grid>
        </Grid>

        <Modal
          open={open}
          close={() => setOpen(false)}
          mainText="차단하기"
          subText2={`${targetUserInfo.nickname} 님을 정말 차단시겠습니까?`}
          agreeText="확인"
          agree={BlockUser}
        />
      </Container>
    </div>
  );
};

export default React.memo(ChatRoom);

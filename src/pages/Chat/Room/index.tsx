import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatAlarmCheck,
  getUnchecked,
} from 'src/redux/modules/ChatModule/chat';
// socket
import socket from 'src/util/socket';
// apis
import apis from 'src/shared/api';
// moment
import moment from 'moment';
// history
import { history, useTypedSelector } from '../../../redux/configureStore';
// user info
import { delUserInfo, getUserInfo } from '../../../shared/userInfo';
// elements
import { Grid, Text, Button, Container } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
import Modal from '../../../components/Modal';
// style
import { WarningText, ChatInputArea } from './style';
import { setMediaLimitBoxSize } from '../../../styles/Media';

interface ChatLogType {
  curTime: number;
  message: string;
  userPk: number;
}

interface ShowChatLogType {
  userPk: number;
  chatLogs: ChatLogType[];
}

const ShowChatLog = React.memo<ShowChatLogType>(({ userPk, chatLogs }) => {
  return (
    <>
      {chatLogs.map((chat, idx) => (
        <SpeechBubble
          person={userPk === chat.userPk}
          next={
            idx < chatLogs.length - 1
              ? chat.userPk === chatLogs[idx + 1].userPk
              : false
          }
          key={(Date.now() + Math.random() + idx).toString(36)}
        >
          {chat.message}
        </SpeechBubble>
      ))}
    </>
  );
});

const ChatRoom = () => {
  const targetUserInfo = getUserInfo('targetUserInfo');
  const targetUserPk = targetUserInfo.targetPk;

  const dispatch = useDispatch();
  const alarmCount = useTypedSelector((state) => state.chat.alarmCount);
  const unchecked: number = useSelector(getUnchecked(targetUserPk));

  const { userPk, nickname } = getUserInfo('userInfo');

  const [chatLogs, setChatLogs] = React.useState<ChatLogType[]>([]);
  const [chatLog, setChatLog] = React.useState<ChatLogType>({
    curTime: 0,
    message: '',
    userPk: 0,
  });
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const messageRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const roomName =
    (userPk < targetUserPk && `${userPk}:${targetUserPk}`) ||
    `${targetUserPk}:${userPk}`;

  const QuitRoom = () => {
    socket.emit('ByeBye', { roomName, userPk });
    // quit
    delUserInfo('targetUserInfo');

    history.replace('/chat');
  };

  const BlockUser = () => {
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

  const handleResizeHeight = React.useCallback(() => {
    if (textAreaRef.current && textAreaRef.current.scrollHeight < 150) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight - 24
      }px`;
    }
  }, []);

  const handleInitailzed = () => {
    if (textAreaRef.current) textAreaRef.current.style.height = 'auto';
  };

  const textAreaHeight =
    textAreaRef.current && parseInt(textAreaRef.current.style.height, 10);
  const marginBottom = textAreaHeight ? textAreaHeight + 70 : 90;

  React.useEffect(() => {
    if (alarmCount > 0) dispatch(ChatAlarmCheck(alarmCount - unchecked));

    socket.emit('join', { joiningUserPk: userPk, targetUserPk, nickname });

    socket.on('chatLogs', (logs) => {
      const addedChatLog = logs.chatLogs.map((log: string) => JSON.parse(log));

      setChatLogs(addedChatLog);
    });

    return () => {
      socket.emit('leave', { roomName, userPk });
    };
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [chatLogs, marginBottom]);

  React.useEffect(() => {
    socket.on('updateMessage', (data) => {
      setChatLog(data);
    });

    setChatLogs(chatLogs.concat(chatLog));
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
      handleInitailzed();
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
  const date = chatLogs[0] ? moment(chatLogs[0].curTime) : moment();

  return (
    <>
      <RoomHeader
        methods={[QuitRoom, () => setOpen(true)]}
        targetUserInfo={targetUserInfo}
      />

      <div ref={messageRef}>
        <Container>
          <Grid margin={`0 0 ${marginBottom}px`}>
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

            <ShowChatLog userPk={userPk} chatLogs={chatLogs} />

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
              ver="flex-end"
              addstyle={setMediaLimitBoxSize('768px')}
            >
              <ChatInputArea
                ref={textAreaRef}
                rows={1}
                placeholder="채팅 내용 입력"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }
                }}
                onInput={handleResizeHeight}
              />

              <Button
                padding="6px 15px"
                margin="0 9px 6px 0"
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
    </>
  );
};

export default React.memo(ChatRoom);

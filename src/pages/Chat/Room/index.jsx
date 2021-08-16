import React, { useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// socket
import io from 'socket.io-client';
// query string
import queryString from 'query-string';
// moment
import moment from 'moment';
// history
import { history } from '../../../redux/configureStore';
// user info
import { getUserInfo } from '../../../shared/userInfo';
// elements
import { Grid, Text, Input, Button } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
// reducer
import { ChatCreators } from '../../../redux/modules/chat';
// style
import { WarningText, ChatInputAreaSize } from './style';

const ChatRoom = () => {
  const ENDPOINT = 'https://soujinko.shop';
  const socket = io(ENDPOINT);

  const dispatch = useDispatch();
  const { roomList, alarmCount } = useSelector(state => ({
    roomList: state.chat.list,
    alarmCount: state.chat.alarmCount,
  }));

  const { userPk, nickname } = getUserInfo();

  const targetUserPk = parseInt(queryString.parse(location.search).number, 10);

  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState('');

  const unchecked = roomList.filter(
    room => room.targetPk === targetUserPk,
  ).unchecked;

  const roomName =
    (userPk < targetUserPk && `${userPk}:${targetUserPk}`) ||
    `${targetUserPk}:${userPk}`;

  const quitRoom = async () => {
    await socket.emit('ByeBye', { roomName, userPk });
    dispatch(ChatCreators.DeleteChatRoom(targetUserPk));

    history.replace('/chat');
  };

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  useEffect(() => {
    if (alarmCount > 0)
      dispatch(ChatCreators.ChatAlarmCheck(alarmCount - unchecked));

    socket.emit('join', { joiningUserPk: userPk, targetUserPk, nickname });

    socket.on('chatLogs', logs => {
      const addedChatLog = logs.chatLogs.map(log => JSON.parse(log));

      setChatLog(addedChatLog);
    });

    return () => {
      socket.emit('leave', { roomName, userPk });
      dispatch(ChatCreators.ChooseChatRoom({}));
    };
  }, []);

  useEffect(() => {
    socket.on('updateMessage', data => {
      setChatLog(logs => [...logs, data]);
    });
  }, [chatLog]);

  const sendMessage = async () => {
    if (message) {
      await socket.emit('sendMessage', {
        roomName,
        targetPk: targetUserPk,
        message,
        userPk,
      });

      setMessage('');
    }
  };

  const DATEFORMAT = 'YYYY년 M월 D일 dddd';

  moment.lang('ko', {
    weekdays: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
  });

  return (
    <Grid margin="0 0 95px">
      <RoomHeader quit={quitRoom} />

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
        {chatLog[0]
          ? moment(chatLog[0].curTime).format(DATEFORMAT)
          : moment().format(DATEFORMAT)}
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
        maxWidth="600px"
        radius="12px"
        bgColor="white"
        border="1px solid #E7E7E7"
        isFlex
        hoz="space-between"
        ver="center"
        tab="max-width: 768px"
      >
        <Input
          placeholder="채팅 내용 입력"
          border="none"
          value={message}
          addstyle={ChatInputAreaSize}
          _onChange={e => setMessage(e.target.value)}
          _onKeyPress={e => (e.key === 'Enter' ? sendMessage() : null)}
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
  );
};

export default ChatRoom;

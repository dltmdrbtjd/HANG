import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
// redux
import { useSelector } from 'react-redux';
// socket
import io from 'socket.io-client';
// query string
import queryString from 'query-string';
// elements
import { Grid, Text, Input, Button } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
// style
import WarningText from './style';

const ChatRoom = () => {
  const ENDPOINT = 'https://soujinko.shop';
  const socket = io(ENDPOINT);

  const { userPk, nickname } = useSelector(state => ({
    userPk: state.user.userInfo.userPk,
    nickname: state.user.userInfo.nickname,
  }));

  const targetUserPk = queryString.parse(location.search).number;

  const [chatLog, setChatLog] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const room =
      (userPk < targetUserPk && `${userPk}:${targetUserPk}`) ||
      `${targetUserPk}:${userPk}`;

    socket.emit('join', { joiningUserPk: userPk, targetUserPk, nickname });

    socket.on('chatLogs', messages => setChatLog(messages));

    return () => {
      socket.emit('leave', { room });
    };
  }, [userPk]);

  useEffect(() => {
    socket.on('updateMessage', data => {
      setChatLog([
        ...chatLog,
        {
          name: data.name,
          message: data.message,
        },
      ]);
    });
  }, [chatLog]);

  const sendMessage = () => {
    if (message) socket.emit('sendMessage', { message });
  };

  return (
    <Grid margin="0 0 80px">
      <ScrollToBottom>
        <RoomHeader />

        <Text fs="xs" wb="keep-all" padding="10px 12px" addstyle={WarningText}>
          매너있는 채팅 부탁드립니다. 약속을 일방적으로 파기하거나 지키지 않을
          경우 제재 대상이 될 수 있습니다.
        </Text>

        <Text fs="xs" textAlign="center" margin="0 0 20px">
          채팅 시작 시간
        </Text>

        {chatLog.map((chat, idx) => (
          <SpeechBubble
            person={nickname === chat.name}
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
            width="80%"
            placeholder="채팅 내용 입력"
            border="none"
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
      </ScrollToBottom>
    </Grid>
  );
};

export default ChatRoom;

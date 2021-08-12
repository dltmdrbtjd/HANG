import React, { useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
// redux
import { useSelector } from 'react-redux';
// socket
import io from 'socket.io-client';
// elements
import { Grid, Text, Input, Button } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
// style
import WarningText from './style';

const ChatRoom = () => {
  const { userPk, nickname } = useSelector(state => ({
    userPk: state.user.userInfo.userPk,
    nickname: state.user.userInfo.nickname,
  }));

  useEffect(() => {
    const socket = io('https://soujinko.shop');
    const room = (userPk < 1 && `${userPk}:${1}`) || `${1}:${userPk}`;

    socket.emit('join', { joiningUserPk: userPk, targetUserPk: 1, nickname });

    return () => {
      socket.emit('leave', { room });
    };
  }, []);

  return (
    <Grid margin="0 0 80px">
      <RoomHeader />

      <Text fs="xs" wb="keep-all" padding="10px 12px" addstyle={WarningText}>
        매너있는 채팅 부탁드립니다. 약속을 일방적으로 파기하거나 지키지 않을
        경우 제재 대상이 될 수 있습니다.
      </Text>

      <Text fs="xs" textAlign="center" margin="0 0 20px">
        채팅 시작 시간
      </Text>

      <Grid>
        <SpeechBubble />
        <SpeechBubble person="me" />
        <SpeechBubble />
        <SpeechBubble />
        <SpeechBubble person="me" />
        <SpeechBubble person="me" />
        <SpeechBubble person="me" />
        <SpeechBubble />
      </Grid>

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
        <Input width="80%" placeholder="채팅 내용 입력" border="none" />

        <Button padding="6px 15px" margin="0 9px 0 0">
          전송
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChatRoom;

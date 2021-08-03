import React from 'react';
// elements
import { Grid, Text, Input, Button } from '../../../elements';
// components
import SpeechBubble from './SpeechBubble';
import RoomHeader from './RoomHeader';
// style
import WarningText from './style';

const ChatRoom = () => {
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
        radius="12px"
        bgColor="white"
        border="1px solid #E7E7E7"
        display="flex"
        hoz="space-between"
        ver="center"
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
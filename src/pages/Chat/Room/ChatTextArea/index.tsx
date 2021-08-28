import React from 'react';
// context
// import io from 'socket.io-client';
// import { SocketContext } from 'src/context/socket';
import { socket } from 'src/util/socket';
import { chatStatus } from '../ChatContext';
// user info
import { getUserInfo } from '../../../../shared/userInfo';
// elements
import { Button, Grid } from '../../../../elements';
// style
import { setMediaLimitBoxSize } from '../../../../styles/Media';
import { ChatInputArea } from '../style';

// const socket = React.useContext(SocketContext);

const ChatTextArea = () => {
  // const socket = React.useContext(SocketContext);
  const { roomName, inputBoxHeightState } = React.useContext(chatStatus);

  const { userPk } = getUserInfo('userInfo');
  const { targetPk } = getUserInfo('targetUserInfo');

  const [message, setMessage] = React.useState<string>('');

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = React.useCallback(() => {
    if (textAreaRef.current && textAreaRef.current.scrollHeight < 150) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${
        textAreaRef.current.scrollHeight - 24
      }px`;

      inputBoxHeightState.setInputBoxHeight(
        textAreaRef.current.style.height === 'auto'
          ? 90
          : parseInt(textAreaRef.current.style.height, 10) + 70,
      );
    }
  }, []);

  const handleTextAreaInitailized = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      inputBoxHeightState.setInputBoxHeight(90);
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit('sendMessage', {
        roomName,
        targetPk,
        message,
        userPk,
      });

      setMessage('');
    }
  };

  return (
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
              handleTextAreaInitailized();
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
  );
};

export default React.memo(ChatTextArea);

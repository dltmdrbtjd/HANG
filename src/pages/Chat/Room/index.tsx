import React from 'react';
// context
import ChatContext from './ChatContext';
// component
import ChatRoomWrapper from './ChatRoomWrapper';

const ChatRoom = () => {
  return (
    <ChatContext>
      <ChatRoomWrapper />
    </ChatContext>
  );
};

export default ChatRoom;

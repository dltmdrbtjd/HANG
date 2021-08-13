import React, { useEffect } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// elements
import { Grid } from '../../elements';
// components
import ChatCard from './ChatCard';
// reducer
import { ChatCreators } from '../../redux/modules/chat';

const Chat = () => {
  const dispatch = useDispatch();

  const roomList = useSelector(state => state.chat.list);

  useEffect(() => {
    dispatch(ChatCreators.ChatRoomLoadDB());
  }, []);

  return (
    <Grid margin="-24px 0 0">
      {roomList.map((room, idx) => {
        let [lastChat] = room.lastChat;

        if (lastChat)
          lastChat =
            typeof lastChat === 'object' ? lastChat : JSON.parse(lastChat);

        return (
          <ChatCard
            targetUserPk={room.targetPk}
            profileImg={room.profileImg}
            nickname={room.nickname}
            unchecked={parseInt(room.unchecked, 10)}
            message={lastChat ? lastChat.message : null}
            time={lastChat ? lastChat.curTime : null}
            key={(Date.now() + Math.random() + idx).toString(36)}
          />
        );
      })}
    </Grid>
  );
};

export default Chat;

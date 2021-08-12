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
        const [lastChat] = room.lastChat;

        return (
          <ChatCard
            targetUserPk={room.targetPk}
            profileImg={room.profileImg}
            nickname={room.nickname}
            message={lastChat ? JSON.parse(lastChat).message : null}
            time={lastChat ? JSON.parse(lastChat).curTime : null}
            key={(Date.now() + Math.random() + idx).toString(36)}
          />
        );
      })}
    </Grid>
  );
};

export default Chat;

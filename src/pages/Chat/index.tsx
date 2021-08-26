import React from 'react';
// redux
import { useTypedSelector } from 'src/redux/configureStore';
// time
import timeFormat from 'src/util/timeFormat';
// elements
import { Container } from '../../elements';
// components
import ChatCard from './ChatCard';
import NoInfo from '../../components/NoInfo';
// image
import chatnotfound from '../../Images/notfound/chatnotfound.png';

const Chat = () => {
  const roomList: any = useTypedSelector((state) => state.chat.list);

  return (
    <Container padding="66px 0 80px">
      <NoInfo
        list={roomList}
        contents="현재 대화중인 사람이 없습니다."
        imageUrl={chatnotfound}
      >
        {roomList.map((room, idx) => {
          let lastChat: any = room.lastChat[0];

          if (lastChat)
            lastChat =
              typeof lastChat === 'object' ? lastChat : JSON.parse(lastChat);

          return (
            <ChatCard
              targetUserPk={room.targetPk}
              profileImg={room.profileImg}
              nickname={room.nickname}
              unchecked={parseInt(room.unchecked, 10)}
              message={
                lastChat
                  ? lastChat.message
                  : `${room.nickname} 님과 채팅을 시작해보세요`
              }
              time={lastChat ? timeFormat(lastChat.curTime) : null}
              key={(Date.now() + Math.random() + idx).toString(36)}
            />
          );
        })}
      </NoInfo>
    </Container>
  );
};

export default Chat;

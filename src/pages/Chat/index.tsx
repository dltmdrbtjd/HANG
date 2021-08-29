import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import {
  ChatCreators,
  CreateChatRoom,
} from 'src/redux/modules/ChatModule/chat';
// type
import { ShowChatInfo, LastChat } from 'src/redux/modules/ChatModule/type';
// socket
import { socket } from 'src/util/socket';
// time
import timeFormat from 'src/util/timeFormat';
// elements
import { Container } from '../../elements';
// components
import ChatCard from './ChatCard';
import NoInfo from '../../components/NoInfo';

const Chat = () => {
  const dispatch = useDispatch();
  const roomList: any = useTypedSelector((state) => state.chat.list);
  const newMessage = useTypedSelector((state) => state.chat.newMessage);

  React.useEffect(() => {
    if (newMessage.userPk && newMessage.roomIdx === -1)
      socket.emit('newRoom', { targetPk: newMessage.userPk });
  }, [newMessage]);

  React.useEffect(() => {
    dispatch(ChatCreators.fetchGetChatRoomList());

    socket.on('newRoom', (data) => {
      dispatch(CreateChatRoom(data));
    });

    return () => {
      socket.off('newRoom');
    };
  }, []);

  return (
    <Container padding="66px 0 80px">
      <NoInfo
        list={roomList}
        contents="현재 대화중인 사람이 없습니다."
        imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/chatnotfound.png"
      >
        {roomList.map((room: ShowChatInfo, idx: number) => {
          const lastChat: LastChat = room.lastChat[0];

          return (
            <ChatCard
              targetUserPk={room.targetPk}
              profileImg={room.profileImg}
              nickname={room.nickname}
              unchecked={room.unchecked}
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

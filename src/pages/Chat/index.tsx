import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from 'src/redux/configureStore';
import {
  ChatCreators,
  CreateChatRoom,
  getUserPkList,
} from 'src/redux/modules/ChatModule/chat';
// type
import { ReadChatInfo, LastChat } from 'src/redux/modules/ChatModule/type';
// socket
import { SocketContext } from 'src/context/socket';
import { chatLogStatus } from 'src/globalState/chatStatus';
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
  const userPkList: number[] = useSelector(getUserPkList);

  const { userPk, message, time } = React.useContext(chatLogStatus);
  const socket = React.useContext(SocketContext);
  console.log(userPk, message, time);

  React.useEffect(() => {
    dispatch(ChatCreators.fetchGetChatRoomList());

    socket.on('newRoom', (data) => {
      dispatch(
        CreateChatRoom({
          lastChat: [{ message, curTime: time }],
          unchecked: 1,
          targetPk: userPk,
          ...data,
        }),
      );
    });

    return () => {
      socket.off('newRoom', () => {
        console.log('new room off');
      });
    };
  }, []);

  React.useEffect(() => {
    if (userPk && !userPkList.includes(userPk))
      socket.emit('newRoom', { targetPk: userPk });
  }, [userPk]);

  return (
    <Container padding="66px 0 80px">
      <NoInfo
        list={roomList}
        contents="현재 대화중인 사람이 없습니다."
        imageUrl="https://hang-image-upload.s3.ap-northeast-2.amazonaws.com/localImage/notfound/chatnotfound.png"
      >
        {roomList.map((room: ReadChatInfo, idx: number) => {
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

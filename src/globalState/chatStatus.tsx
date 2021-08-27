import React from 'react';
// socket
import { SocketContext } from 'src/context/socket';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserPkList,
  ChatHistoryUpdate,
  CreateChatRoom,
  ChatAlarmCheck,
} from 'src/redux/modules/ChatModule/chat';
// type
import { NewMessage } from 'src/redux/modules/ChatModule/type';
// signin status
import { signInStatus } from 'src/context/signInContext';

export const chatLogStatus = React.createContext(null);

interface NewRoomType {
  nickname: string;
  profileImg: string;
}

const ChatStatus = ({ children }) => {
  const dispatch = useDispatch();
  const userPkList: number[] = useSelector(getUserPkList);

  const socket = React.useContext(SocketContext);

  const [chatLog, setChatLog] = React.useState<NewMessage>({
    userPk: null,
    message: null,
    time: null,
  });

  const { isLogIn } = React.useContext(signInStatus);

  const newRoom = (userInfo: NewRoomType) => {
    dispatch(
      CreateChatRoom({
        lastChat: [{ message: chatLog.message, curTime: chatLog.time }],
        unchecked: 1,
        targetPk: chatLog.userPk,
        ...userInfo,
      }),
    );
  };

  const createChatRoom = React.useMemo(() => newRoom, [chatLog]);

  React.useEffect(() => {
    if (isLogIn) {
      socket.on('unchecked', () => {
        dispatch(ChatAlarmCheck(Number(true)));
      });

      socket.on('newMessage', (data: NewMessage) => {
        setChatLog(data);
        dispatch(ChatHistoryUpdate(data));
      });

      socket.on('newRoom', (data) => {
        createChatRoom(data);
      });
    }
  }, [isLogIn]);

  React.useEffect(() => {
    if (chatLog.userPk && !userPkList.includes(chatLog.userPk))
      socket.emit('newRoom', { targetPk: chatLog.userPk });
  }, [chatLog]);

  return <>{children}</>;
};

export default ChatStatus;

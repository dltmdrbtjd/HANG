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

  React.useEffect(() => {
    if (isLogIn) {
      socket.on('unchecked', () => {
        dispatch(ChatAlarmCheck());
      });

      socket.on('newMessage', (data: NewMessage) => {
        setChatLog(data);
        dispatch(ChatHistoryUpdate(data));
      });

      socket.on('newRoom', (data) => {
        dispatch(
          CreateChatRoom({
            lastChat: [{ message: chatLog.message, curTime: chatLog.time }],
            unchecked: 1,
            targetPk: chatLog.userPk,
            ...data,
          }),
        );
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

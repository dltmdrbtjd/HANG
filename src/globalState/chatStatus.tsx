import React from 'react';
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
// socket
import socketIOClient from 'socket.io-client';
// signin status
import { signInStatus } from './signInStatus';

export const chatLogStatus = React.createContext(null);

const ChatStatus = ({ children }) => {
  const dispatch = useDispatch();
  const userPkList: number[] = useSelector(getUserPkList);

  const ENDPOINT = 'https://soujinko.shop';
  const socket = socketIOClient(ENDPOINT);

  const [chatLog, setChatLog] = React.useState<NewMessage>({
    userPk: null,
    message: null,
    time: null,
  });

  const { isLogIn } = React.useContext(signInStatus);

  React.useEffect(() => {
    if (isLogIn) {
      socket.on('unchecked', () => {
        dispatch(ChatAlarmCheck(Number(true)));
      });

      socket.on('newMessage', (data: NewMessage) => {
        setChatLog(data);
        dispatch(ChatHistoryUpdate(data));
      });
    }
  }, [isLogIn]);

  React.useEffect(() => {
    if (chatLog.userPk && !userPkList.includes(chatLog.userPk)) {
      socket.emit('newRoom', { targetPk: chatLog.userPk });
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
  }, [chatLog]);

  return (
    <chatLogStatus.Provider value={{ count: 0 }}>
      {children}
    </chatLogStatus.Provider>
  );
};

export default ChatStatus;

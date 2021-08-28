import React from 'react';
// socket
import { SocketContext } from 'src/context/socket';
// redux
import { useDispatch } from 'react-redux';
import {
  ChatHistoryUpdate,
  ChatAlarmCheck,
} from 'src/redux/modules/ChatModule/chat';
// type
import { NewMessage } from 'src/redux/modules/ChatModule/type';
// signin status
import { signInStatus } from 'src/context/signInContext';

export const chatLogStatus = React.createContext(null);

const ChatStatus = ({ children }) => {
  const dispatch = useDispatch();

  const socket = React.useContext(SocketContext);

  const [chatLog, setChatLog] = React.useState<NewMessage>({
    userPk: null,
    message: null,
    time: null,
  });

  const chatLogMemorize = React.useMemo(() => chatLog, [chatLog]);

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
    }
  }, [isLogIn]);

  return (
    <chatLogStatus.Provider value={chatLogMemorize}>
      {children}
    </chatLogStatus.Provider>
  );
};

export default ChatStatus;

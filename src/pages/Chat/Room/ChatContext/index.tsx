import React from 'react';
// user info
import { getUserInfo } from 'src/shared/userInfo';
// socket
import { SocketContext } from 'src/context/socket';
// redux
import { useDispatch } from 'react-redux';
import { CheckChatAlarm } from 'src/redux/modules/ChatModule/chat';

export const chatStatus = React.createContext(null);

export interface ChatLogType {
  curTime: number;
  message: string;
  userPk: number;
}

const useProviderChatLogs = () => {
  const { targetPk } = getUserInfo('targetUserInfo');
  const { userPk } = getUserInfo('userInfo');

  const roomName =
    (userPk < targetPk && `${userPk}:${targetPk}`) || `${targetPk}:${userPk}`;

  const [chatLogs, setChatLogs] = React.useState<ChatLogType[]>([]);
  const [inputBoxHeight, setInputBoxHeight] = React.useState<number>(90);

  const chatLogState = {
    chatLogs,
    setChatLogs,
  };

  const inputBoxHeightState = React.useMemo(
    () => ({
      inputBoxHeight,
      setInputBoxHeight,
    }),
    [inputBoxHeight],
  );

  return {
    roomName,
    chatLogState,
    inputBoxHeightState,
  };
};

const ChatContext = ({ children }) => {
  const chat = useProviderChatLogs();
  const { roomName, chatLogState } = chat;

  const { targetPk } = getUserInfo('targetUserInfo');
  const { userPk, nickname } = getUserInfo('userInfo');

  const socket = React.useContext(SocketContext);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(CheckChatAlarm(targetPk));
    console.log('chat context 호출');

    socket.emit('join', {
      joiningUserPk: userPk,
      targetUserPk: targetPk,
      nickname,
    });

    socket.on('chatLogs', (logs) => {
      const addedChatLog = logs.chatLogs.map((log: string) => JSON.parse(log));

      chatLogState.setChatLogs(addedChatLog);
    });

    socket.on('updateMessage', (data) => {
      chatLogState.setChatLogs((chatLog) => chatLog.concat(data));
    });

    return () => {
      console.log('chat context leave');
      socket.emit('leave', { roomName, userPk });
    };
  }, []);

  return <chatStatus.Provider value={chat}>{children}</chatStatus.Provider>;
};

export default ChatContext;

import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { MyPageCreators } from 'src/redux/modules/MyPageModule/mypage';
import {
  ChatHistoryUpdate,
  ChatAlarmCheck,
} from 'src/redux/modules/ChatModule/chat';
// router
import { useLocation } from 'react-router';
// socket
import { socket } from 'src/util/socket';
// type
import { NewMessage } from 'src/redux/modules/ChatModule/type';
// token
import { delToken, isLogin } from 'src/shared/token';
import { getUserInfo, delUserInfo } from 'src/shared/userInfo';

export const signInStatus = React.createContext(null);

const useProvideSignIn = () => {
  const dispatch = useDispatch();
  const path: string = useLocation().pathname;

  const signIn = () => {
    const { userPk } = getUserInfo('userInfo');

    dispatch(MyPageCreators.fetchGetMyInfo(userPk));
    dispatch(MyPageCreators.fetchGetMyPromise());
    dispatch(MyPageCreators.fetchGetBlockList());

    if (path !== '/chat') {
      socket.on('unchecked', () => {
        dispatch(ChatAlarmCheck());
      });
    }

    socket.on('newMessage', (data: NewMessage) => {
      dispatch(ChatHistoryUpdate(data));
    });
  };

  const signOut = () => {
    delToken();
    delUserInfo('userInfo');
    delUserInfo('targetUserInfo');
  };

  return { signIn, signOut };
};

const SignInStatus: React.FC = ({ children }) => {
  const signIn = useProvideSignIn();

  React.useEffect(() => {
    if (isLogin()) signIn.signIn();
  }, []);

  return (
    <signInStatus.Provider value={signIn}>{children}</signInStatus.Provider>
  );
};

export default SignInStatus;

import React from 'react';
// redux
import { useDispatch } from 'react-redux';
import { MyPageCreators } from 'src/redux/modules/MyPageModule/mypage';
// token
import { delToken, isLogin } from 'src/shared/token';
import { getUserInfo, delUserInfo } from 'src/shared/userInfo';
// socket
import { socket } from 'src/util/socket';

export const signInStatus = React.createContext(null);

const useProvideSignIn = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    const { userPk } = getUserInfo('userInfo');

    dispatch(MyPageCreators.fetchGetMyInfo(userPk));
    dispatch(MyPageCreators.fetchGetMyPromise());
    dispatch(MyPageCreators.fetchGetBlockList());

    socket.emit('login', { uid: userPk });
  };

  const signOut = () => {
    const { userPk } = getUserInfo('userInfo');

    socket.emit('logout', { uid: userPk });

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

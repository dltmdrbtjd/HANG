import React from 'react';
// token
import jwtDecode from 'jwt-decode';
import { getToken, delToken, setToken } from 'src/shared/token';
import { delUserInfo, setUserInfo } from 'src/shared/userInfo';

export const signInStatus = React.createContext(null);

const useProvideSignIn = () => {
  const [isLogIn, setIsLogIn] = React.useState<boolean>(!!getToken());

  const signIn = (token: string) => {
    setToken(token);
    setUserInfo('userInfo', jwtDecode(token));
    setIsLogIn(true);
  };

  const signOut = () => {
    delToken();
    delUserInfo('userInfo');
    delUserInfo('targetUserInfo');
    setIsLogIn(false);
  };

  return { isLogIn, signIn, signOut };
};

const SignInStatus: React.FC = ({ children }) => {
  const signIn = useProvideSignIn();

  return (
    <signInStatus.Provider value={signIn}>{children}</signInStatus.Provider>
  );
};

export default SignInStatus;

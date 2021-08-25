import React from 'react';
// token
import { getToken, delToken } from 'src/shared/token';
import { delUserInfo } from 'src/shared/userInfo';

export const signInStatus = React.createContext(null);

const useProvideSignIn = () => {
  const [isLogIn, setIsLogIn] = React.useState<boolean>(!!getToken());

  const signIn = () => {
    setIsLogIn(true);
  };

  const signOut = () => {
    delToken();
    delUserInfo('userInfo');
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

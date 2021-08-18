import React from 'react';
// history
import { history } from 'src/redux/configureStore';

interface UserInfo {
  userId: string;
  password: string;
}

interface SignInStatus {
  status: boolean;
  errorMsg: string;
}

const [signInStatus, setSignInStatus] = React.useState<SignInStatus>({
  status: false,
  errorMsg: '',
});

const SignIn = (userInfo: UserInfo) => {
  apis
    .Login(userInfo)
    .then(({ data }) => {
      setCookie(data.accessToken);
    })
    .then(() => setUserInfo())
    .then(() => history.replace('/'))
    .catch(() => {
      setSignInStatus({
        status: false,
        errorMsg: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
      });
    });
};

export { SignIn, signInStatus };

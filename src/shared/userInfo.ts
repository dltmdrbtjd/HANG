// jwt decode
import jwtDecode from 'jwt-decode';

import { getToken } from './token';

interface UserInfo {
  exp: number;
  iat: number;
  nickname: string;
  userPk: number;
}

const setUserInfo = (): void => {
  const userInfo = jwtDecode(getToken());

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const getUserInfo = (): UserInfo => {
  const userInfo = localStorage.getItem('userInfo');

  return JSON.parse(userInfo);
};

const delUserInfo = (): void => {
  localStorage.removeItem('userInfo');
};

export { setUserInfo, getUserInfo, delUserInfo };

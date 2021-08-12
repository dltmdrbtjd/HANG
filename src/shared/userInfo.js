// jwt decode
import jwtDecode from 'jwt-decode';

import { getCookie } from './cookie';

const setUserInfo = () => {
  const userInfo = jwtDecode(getCookie());

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const getUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');

  return JSON.parse(userInfo);
};

const delUserInfo = () => {
  localStorage.removeItem('userInfo');
};

export { setUserInfo, getUserInfo, delUserInfo };

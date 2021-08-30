import serialize from 'serialize-javascript';

interface UserInfo {
  exp: number;
  iat: number;
  nickname: string;
  userPk: number;
}

export interface TargetUserInfo {
  nickname: string;
  profileImg: null | string;
  targetPk: number;
}

const setUserInfo = (
  key: string,
  userInfo: UserInfo | TargetUserInfo,
): void => {
  localStorage.setItem(key, serialize(userInfo, { isJSON: true }));
};

const getUserInfo = (key: string): any => {
  const userInfo = localStorage.getItem(key);

  return JSON.parse(userInfo);
};

const delUserInfo = (key: string): void => {
  localStorage.removeItem(key);
};

export { setUserInfo, getUserInfo, delUserInfo };

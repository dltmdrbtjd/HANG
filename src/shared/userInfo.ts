interface UserInfo {
  exp: number;
  iat: number;
  nickname: string;
  userPk: number;
}

interface TargetUserInfo {
  nickname: string;
  profileImg: null | string;
  targetPk: number;
}

const setUserInfo = (
  key: string,
  userInfo: UserInfo | TargetUserInfo,
): void => {
  localStorage.setItem(key, JSON.stringify(userInfo));
};

const getUserInfo = (key: string): any => {
  const userInfo = localStorage.getItem(key);

  return JSON.parse(userInfo);
};

const delUserInfo = (key: string): void => {
  localStorage.removeItem(key);
};

export { setUserInfo, getUserInfo, delUserInfo };

import axios from 'axios';
// cookie
import { getCookie, delCookie } from './cookie';

// 추후에 백엔드 서버 열리면 baseURL 변경됩니다.
const instance = axios.create({
  baseURL: 'https://soujinko.shop',
  withCredentials: true,
  timeout: 3000,
});

instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.token = getCookie();
  config.headers.Accept = 'application/json';

  return config;
});

instance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const path = window.location.pathname;

    if (
      error.response.status === 401 &&
      !['/signup', '/login', '/signup/forgot_pwd'].includes(path)
    ) {
      window.alert('토큰이 만료되었습니다.');
      delCookie();
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);

// 사용할 api들
const apis = {
  // user
  SMSAuth: phone => instance.post('/api/users/sms_auth', phone),
  SignUp: user => instance.post('/api/users', user),
  Pauth: authInfo => instance.post('/api/users/p_auth', authInfo),
  Duplicate: user => instance.post('/api/users/duplicate', user),
  Login: user => instance.post('/api/users/signin', user),
  LogOut: () => instance.delete('/api/users/signout'),
  ForgotPwd: userInfo => instance.post('/api/users/password', userInfo),
  Exists: userInfo => instance.post('/api/users/exists', userInfo),
  Withdrawal: () => instance.delete('/api/users/quit'),

  // alarm
  AlarmCheck: () => instance.get('/api/alarm'),
  AlarmLoad: () => instance.get('/api/alarm/detail'),
  AlarmDelete: () => instance.delete('/api/alarm'),

  // main
  MainLoad: () => instance.get('/api/main'),

  // search
  Search: content => instance.post('/api/main/search', content),

  // user detail
  UserDetail: userPk => instance.get(`/api/user/${userPk}`),
  MyPromise: () => instance.get('/api/guide'),
  GuideRequest: info => instance.post('/api/guide', info),
  DoGuide: info => instance.post('/api/traveler', info),

  // favorite
  Like: targetPk => instance.post('/api/like', targetPk),
  UnLike: targetPk => instance.delete('/api/like', targetPk),
  LikeLoad: () => instance.get('/api/like'),

  // myinfo
  GetMyInfo: () => instance.get('/api/mypage'),
  CreateTripEvent: tripInfo =>
    instance.post('/api/mypage/create_trip', tripInfo),
  DeleteTripEvent: tripId => instance.delete('/api/mypage', { data: tripId }),
  GetMyPromise: () => instance.get('/api/mypage/promise'),
  UpdateProfile: userInfo => instance.patch('/api/mypage', userInfo),
  AgreePromise: id => instance.post('/api/mypage/make_promise', id),
  RejectPromise: reqId => instance.patch('/api/mypage/reject_request', reqId),
  CancelPromise: tripId => instance.patch('/api/mypage/reject_confirm', tripId),
  GuideToggle: () => instance.patch('/api/mypage/update_guide'),

  // myinfo block
  GetBlockList: () => instance.get('api/users/block'),
  AddBlockList: targetPk => instance.post('api/users/block', targetPk),
  DeleteBlockList: targetPk => instance.patch('api/users/block', targetPk),

  // chat
  GetChatRoom: () => instance.get('/api/users/chat'),
};

export default apis;

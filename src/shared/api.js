import axios from 'axios';
// cookie
import { getCookie, delCookie } from './cookie';

// 추후에 백엔드 서버 열리면 baseURL 변경됩니다.
const instance = axios.create({
  baseURL: 'https://soujinko.shop',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.token = getCookie();
  config.headers.Accept = 'application/json';

  return config;
});

instance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    const path = window.location.pathname;

    if (error.response.status === 401 && path !== '/signup') {
      delCookie();
      window.location.replace('/login');
    }

    return error;
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

  // alarm
  AlarmPatch: alarm => instance.patch('/api/alarm', alarm),
  AlarmLoad: () => instance.get('/api/alarm'),
  AlarmDelete: alarm => instance.delete('/api/alarm', alarm),

  // main
  MainLoad: () => instance.get('/api/main'),

  // search
  Search: content => instance.post('/api/search', content),

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

  // chat 부분은 서버쪽에서 API 설계 완성이 안되서 추후에 수정해주세요!
  // CreateChat:  => instance.post('/api/chat),
  // ChatList: () => instance.get('/api/chat'),
  // OutChat:  => instance.post('/api/chat'),
  // ChatReport: => instance.post('/api/chat'),
};

export default apis;

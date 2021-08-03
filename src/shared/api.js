import axios from 'axios';

// 추후에 백엔드 서버 열리면 baseURL 변경됩니다.
const instance = axios.create({
  baseURL: 'https://soujinko.shop/',
  withCredentials: true,
});

// 추후에 token 추가시 추가 작성바랍니다.
instance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.Accept = 'application/json';
  return config;
});

// 사용할 api들
const apis = {
  // user
  Auth: () => instance.get('/api/users'),
  SMSAuth: phone => instance.post('/api/users/sms_auth', phone),
  SignUp: user => instance.post('/api/users', user),
  Pauth: authInfo => instance.post('/api/users/p_auth', authInfo),
  Duplicate: user => instance.post('/api/users/duplicate', user),
  Login: user => instance.post('/api/users/signin', user),

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
  UnLike: targetPk => instance.post('/api/like', targetPk),
  LikeLoad: () => instance.get('/api/like'),

  // myinfo
  MyinfoLoad: () => instance.get('/api/mypage'),
  AgreePromise: promise => instance.post('/api/mypage', promise),
  CancelPromise: type => instance.patch('/api/mypage/reject_confirm', type),
  RejectPromise: id => instance.patch('/api/mypage', id),
  ChangeInfo: info => instance.patch('/api/mypage', info),
  GuideToggle: () => instance.patch('/api/mypage/update_guiddy'),
  DeleteTrip: tripId => instance.delete('/api/mypage/create_trip', tripId),
  AddTrip: info => instance.post('/api/mypage/create_trip', info),

  // chat 부분은 서버쪽에서 API 설계 완성이 안되서 추후에 수정해주세요!
  // CreateChat:  => instance.post('/api/chat),
  // ChatList: () => instance.get('/api/chat'),
  // OutChat:  => instance.post('/api/chat'),
  // ChatReport: => instance.post('/api/chat'),
};

export default apis;

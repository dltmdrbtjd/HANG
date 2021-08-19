import axios from 'axios';
// types
import {
  SmsType,
  SignUpType,
  PauthType,
  DuplicateType,
  LoginType,
  SearchType,
  GuideRequestType,
  DoGuideType,
  CreateTripEventType,
  DeleteTripEventType,
  UpdateProfileType,
  AgreePromiseType,
  RejectPromiseType,
  CancelPromiseType,
} from './ApiTypes';
// cookie
import { getToken, delToken } from './token';
// 추후에 백엔드 서버 열리면 baseURL 변경됩니다.
const instance = axios.create({
  baseURL: 'https://soujinko.shop',
  withCredentials: true,
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  config.headers.token = getToken();
  config.headers.Accept = 'application/json';

  return config;
});

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    const path = window.location.pathname;

    if (
      error.response.status === 401 &&
      !['/signup', '/login'].includes(path)
    ) {
      window.alert('토큰이 만료되었습니다.');
      delToken();
      window.location.replace('/signIn');
    }

    return Promise.reject(error);
  },
);

// 사용할 api들
const apis = {
  // user
  SMSAuth: (phone: SmsType) => instance.post('/api/users/sms_auth', phone),
  SignUp: (user: SignUpType) => instance.post('/api/users', user),
  Pauth: (authInfo: PauthType) => instance.post('/api/users/p_auth', authInfo),
  Duplicate: (user: DuplicateType) =>
    instance.post('/api/users/duplicate', user),
  Login: (user: LoginType) => instance.post('/api/users/signin', user),
  LogOut: () => instance.delete('/api/users/signout'),

  // alarm
  AlarmCheck: () => instance.get('/api/alarm'),
  AlarmLoad: () => instance.get('/api/alarm/detail'),
  AlarmDelete: () => instance.delete('/api/alarm'),

  // main
  MainLoad: () => instance.get('/api/main'),

  // search
  Search: (content: SearchType) => instance.post('/api/main/search', content),

  // user detail
  UserDetail: (userPk: number | string | string[]) => instance.get(`/api/user/${userPk}`),
  MyPromise: () => instance.get('/api/guide'),
  GuideRequest: (info: GuideRequestType) => instance.post('/api/guide', info),
  DoGuide: (info: DoGuideType) => instance.post('/api/traveler', info),

  // favorite
  LikeToggle: (targetPk: number) =>
    instance.post('/api/like', targetPk),
  LikeLoad: () => instance.get('/api/like'),

  // myinfo
  GetMyInfo: () => instance.get('/api/mypage'),
  CreateTripEvent: (tripInfo: CreateTripEventType) =>
    instance.post('/api/mypage/create_trip', tripInfo),
  DeleteTripEvent: (tripId: DeleteTripEventType) =>
    instance.delete('/api/mypage', { data: tripId }),
  GetMyPromise: () => instance.get('/api/mypage/promise'),
  UpdateProfile: (userInfo: UpdateProfileType) =>
    instance.patch('/api/mypage', userInfo),
  AgreePromise: (id: AgreePromiseType) =>
    instance.post('/api/mypage/make_promise', id),
  RejectPromise: (reqId: RejectPromiseType) =>
    instance.patch('/api/mypage/reject_request', reqId),
  CancelPromise: (tripId: CancelPromiseType) =>
    instance.patch('/api/mypage/reject_confirm', tripId),
  GuideToggle: () => instance.patch('/api/mypage/update_guide'),

  GetChatRoom: () => instance.get('/api/users/chat'),
};

export default apis;

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { history } from 'src/redux/configureStore';
// types
import {
  PhoneType,
  SignUpType,
  PauthType,
  DuplicateType,
  SignInType,
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
import { getToken, delToken, setToken } from './token';
import { setUserInfo } from './userInfo';
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

    if (error.response.status === 307) {
      setToken(error.response.data.newAccessToken);
      setUserInfo('userInfo', jwtDecode(getToken()));
      history.go(0);
    } else if (
      error.response.status === 401 &&
      !['/signup', '/signIn', '/onboarding'].includes(path)
    ) {
      window.alert('토근이 만료되었습니다. 다시 로그인해주세요.');
      delToken();
      history.push('/signIn');
    }
    return Promise.reject(error);
  },
);

// 사용할 api들
const apis = {
  // user
  PhoneVerification: (phone: PhoneType) =>
    instance.post('/api/users/sms_auth', phone),
  SignUp: (user: SignUpType) => instance.post('/api/users', user),
  Pauth: (authInfo: PauthType) => instance.post('/api/users/p_auth', authInfo),
  Duplicate: (user: DuplicateType) =>
    instance.post('/api/users/duplicate', user),
  SignIn: (user: SignInType) => instance.post('/api/users/signin', user),
  SignOut: () => instance.delete('/api/users/signout'),
  ForgotPwd: (userInfo) => instance.post('/api/users/password', userInfo),
  Exists: (userInfo) => instance.post('/api/users/exists', userInfo),
  Withdrawal: () => instance.delete('/api/users/quit'),

  // alarm
  AlarmCheck: () => instance.get('/api/alarm'),
  AlarmLoad: () => instance.get('/api/alarm/detail'),
  AlarmDelete: () => instance.delete('/api/alarm'),

  // main
  MainLoad: () => instance.get('/api/main'),

  // search
  Search: (content: SearchType) => instance.post('/api/main/search', content),

  // user detail
  UserDetail: (userPk: number | string | string[]) =>
    instance.get(`/api/user/${userPk}`),
  MyPromise: () => instance.get('/api/guide'),
  GuideRequest: (info: GuideRequestType) => instance.post('/api/guide', info),
  DoGuide: (info: DoGuideType) => instance.post('/api/traveler', info),

  // favorite
  LikeToggle: (targetPk: number) => instance.post('/api/like', targetPk),
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

  // myinfo block
  GetBlockList: () => instance.get('api/users/block'),
  AddBlockList: (targetPk: { targetPk: number }) =>
    instance.post('api/users/block', targetPk),
  DeleteBlockList: (targetPk: { targetPk: number }) =>
    instance.patch('api/users/block', targetPk),

  GetChatRoom: () => instance.get('/api/users/chat'),
};

export default apis;

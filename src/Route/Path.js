const pathURI = {
  home: '/',
  onboarding: '/onboarding',
  logIn: '/login',
  signUp: '/signup',
  welcome: '/signup/welcome',
  search: '/search',
  detail: '/detail',
  request: '/detail/request',
  favorite: '/favorite',
  mypage: '/mypage',
  promise: '/mypage/promise',
  noti: '/noti',
  chat: '/chat',
  chatRoom: '/chat/room',
};

const HeaderIncluded = [
  '/',
  '/search',
  '/detail',
  '/detail/request',
  '/favorite',
  '/mypage',
  '/mypage/promise',
  '/noti',
  '/chat',
  '/chat/room',
  '/mypage/promise/:page',
  '/mypage/modify',
  '/mypage/create_trip',
];

export { pathURI, HeaderIncluded };

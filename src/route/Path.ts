const pathURI = {
  home: '/',
  onboarding: '/onboarding',
  signIn: '/signin',
  signUp: '/signup',
  forgotPwd: '/signup/forgot_pwd',
  welcome: '/signup/welcome',
  search: '/search',
  detail: '/detail',
  request: '/detail/request',
  favorite: '/favorite',
  mypage: '/mypage',
  promise: '/mypage/promise',
  block: '/mypage/block',
  noti: '/noti',
  chat: '/chat',
  chatRoom: '/chat/room',
  tutorial: '/tutorial',
  minitutorial: '/mini_tutorial',
};

const HeaderIncluded: string[] = [
  '/',
  '/search',
  '/detail',
  '/detail/request',
  '/favorite',
  '/mypage',
  '/mypage/block',
  '/mypage/promise',
  '/noti',
  '/chat',
  '/chat/room',
  '/mypage/modify',
  '/mypage/create_trip',
];

export { pathURI, HeaderIncluded };

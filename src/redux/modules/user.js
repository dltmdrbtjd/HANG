import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import socketIOClient from 'socket.io-client';
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';
// cookie
import { setCookie, delCookie } from '../../shared/cookie';
// user info
import { setUserInfo, delUserInfo } from '../../shared/userInfo';
// socket

const ENDPOINT = 'https://soujinko.shop';
const socket = socketIOClient(ENDPOINT);

const PHONE_AUTH = 'user/PHONE_AUTH';
const DUPLICATE_CHECK = 'user/DUPLICATE_CHECK';
const SET_LOGIN_STATUS = 'user/SET_LOGIN_STATUS';
const INIT_SIGN_UP_INFO = 'user/INIT_SIGN_UP_INFO';
const INIT_LOG_IN_INFO = 'user/INIT_LOG_IN_INFO';

const authPhone = createAction(PHONE_AUTH, status => ({ status }));
const duplicateCheck = createAction(DUPLICATE_CHECK, status => ({ status }));
const setLoginStatus = createAction(SET_LOGIN_STATUS, status => ({
  status,
}));
const initializeSignUpInfo = createAction(INIT_SIGN_UP_INFO);
const initializeLogInInfo = createAction(INIT_LOG_IN_INFO);

const initialState = {
  userInfo: {
    userPk: null,
    nickname: null,
  },

  loginStatus: {
    status: false,
    errorMsg: '',
  },

  duplicateCheck: {
    id: {
      status: false,
      errorMsg: '',
    },

    nickname: {
      status: false,
      errorMsg: '',
    },
  },

  phoneAuth: {
    phoneVali: {
      status: false,
      errorMsg: '',
    },

    smsVali: {
      status: false,
      errorMsg: '',
    },
  },
};

const smsAuthDB = phone => {
  return (dispatch, getState) => {
    const phoneAuth = getState().user.phoneAuth;

    apis
      .SMSAuth(phone)
      .then(() => {
        dispatch(
          authPhone({
            ...phoneAuth,
            phoneVali: {
              status: true,
              errorMsg: '',
            },
          }),
        );
      })
      .catch(err => {
        dispatch(
          authPhone({
            ...phoneAuth,
            phoneVali: {
              status: false,
              errorMsg: '이미 등록된 전화번호입니다.',
            },
          }),
        );
      });
  };
};

const phoneAuthDB = authInfo => {
  return (dispatch, getState) => {
    const phoneAuth = getState().user.phoneAuth;

    apis
      .Pauth(authInfo)
      .then(() => {
        dispatch(
          authPhone({
            ...phoneAuth,
            smsVali: {
              status: true,
              errorMsg: '',
            },
          }),
        );
      })
      .catch(() => {
        dispatch(
          authPhone({
            ...phoneAuth,
            smsVali: {
              status: false,
              errorMsg: '인증 번호가 유효하지 않습니다.',
            },
          }),
        );
      });
  };
};

const duplicateIdCheckDB = userId => {
  return (dispatch, getState) => {
    const dupIdCheck = getState().user.duplicateCheck;

    apis
      .Duplicate(userId)
      .then(() => {
        dispatch(
          duplicateCheck({
            ...dupIdCheck,
            id: { status: true, errorMsg: '' },
          }),
        );
      })
      .catch(err => {
        dispatch(
          duplicateCheck({
            ...dupIdCheck,
            id: { status: false, errorMsg: '이미 등록된 아이디입니다.' },
          }),
        );
      });
  };
};

const duplicateNickCheckDB = nickname => {
  return (dispatch, getState) => {
    const dupNickCheck = getState().user.duplicateCheck;

    apis
      .Duplicate(nickname)
      .then(() => {
        dispatch(
          duplicateCheck({
            ...dupNickCheck,
            nickname: { status: true, errorMsg: '' },
          }),
        );
      })
      .catch(err => {
        dispatch(
          duplicateCheck({
            ...dupNickCheck,
            nickname: {
              status: false,
              errorMsg: '중복되는 닉네임이 있습니다.',
            },
          }),
        );
      });
  };
};

const signUpDB = (image, userInfo) => {
  return (dispatch, getState, { history }) => {
    if (!image) {
      apis
        .SignUp(userInfo)
        .then(() => {
          history.replace('/signup/welcome');
        })
        .catch(err => console.log(err));

      return;
    }

    dispatch(
      ImageCreators.uploadProfileImgDB(image, () => {
        const profileImg = getState().image.profileImg;

        apis
          .SignUp({ ...userInfo, profileImg })
          .then(() => {
            dispatch(ImageCreators.uploadProfileImg(null));
            dispatch(ImageCreators.setProfilePre(null));
          })
          .then(() => {
            history.replace('/signup/welcome');
          })
          .catch(err => console.log(err));
      }),
    );
  };
};

const logInDB = userInfo => {
  return (dispatch, getState, { history }) => {
    apis
      .Login(userInfo)
      .then(res => {
        setCookie(res.data.accessToken);
      })
      .then(() => setUserInfo())
      .then(() => history.replace('/'))
      .catch(() => {
        dispatch(
          setLoginStatus({
            status: false,
            errorMsg: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
          }),
        );
      });
  };
};

const logOutDB = () => {
  return (dispatch, getState, { history }) => {
    apis
      .LogOut()
      .then(async () => {
        const userPk = JSON.parse(localStorage.getItem('userInfo')).userPk;
        delCookie();
        delUserInfo();
        await socket.emit('logout', { uid: userPk });
        socket.disconnect();
      })
      .then(() => {
        delCookie();
      })
      .then(() => {
        delCookie();
      })
      .then(() => {
        history.replace('/login');
      })
      .catch(err => console.error(err));
  };
};

const ExistsIdAndPhoneNumberDB = userInfo => {
  // return dispatch => {
  apis
    .Exists({ ...userInfo })
    .then(() => {
      console.log('완료');
    })
    .catch(err => window.alert(err));
  // };
};

const ForgotPasswordDB = userInfo => {
  apis
    .ForgotPwd(userInfo)
    .then(() => {
      console.log('성공');
    })
    .catch(err => console.log(err));
};

export default handleActions(
  {
    [PHONE_AUTH]: (state, action) =>
      produce(state, draft => {
        draft.phoneAuth = action.payload.status;
      }),

    [DUPLICATE_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.duplicateCheck = action.payload.status;
      }),

    [SET_LOGIN_STATUS]: (state, action) =>
      produce(state, draft => {
        draft.loginStatus = action.payload.status;
      }),

    [INIT_SIGN_UP_INFO]: state =>
      produce(state, draft => {
        draft.duplicateCheck = {
          id: {
            status: false,
            errorMsg: '',
          },

          nickname: {
            status: false,
            errorMsg: '',
          },
        };

        draft.phoneAuth = {
          phoneVali: {
            status: false,
            errorMsg: '',
          },

          smsVali: {
            status: false,
            errorMsg: '',
          },
        };
      }),

    [INIT_LOG_IN_INFO]: state =>
      produce(state, draft => {
        draft.loginStatus = {
          status: false,
          errorMsg: '',
        };
      }),
  },
  initialState,
);

const UserCreators = {
  setLoginStatus,
  smsAuthDB,
  phoneAuthDB,
  duplicateCheck,
  duplicateIdCheckDB,
  duplicateNickCheckDB,
  signUpDB,
  logInDB,
  logOutDB,
  initializeSignUpInfo,
  initializeLogInInfo,
  ExistsIdAndPhoneNumberDB,
  ForgotPasswordDB,
};

export { UserCreators };

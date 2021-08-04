import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';
// cookie
import { setCookie, delCookie } from '../../shared/cookie';

const GET_USER_INFO = 'user/GET_USER_INFO';
const PHONE_AUTH = 'user/PHONE_AUTH';
const DUPLICATE_CHECK = 'user/DUPLICATE_CHECK';
const SET_LOGIN_STATUS = 'user/SET_LOGIN_STATUS';

const getUserInfo = createAction(GET_USER_INFO, userInfo => ({ userInfo }));
const authPhone = createAction(PHONE_AUTH, status => ({ status }));
const duplicateCheck = createAction(DUPLICATE_CHECK, status => ({ status }));
const setLoginStatus = createAction(SET_LOGIN_STATUS, status => ({
  status,
}));

const initialState = {
  userInfo: {
    userId: null,
    nickname: null,
    profileImg: null,
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

const getUserInfoDB = () => {
  return (dispatch, getState, { history }) => {
    apis
      .Auth()
      .then(({ data }) => {
        dispatch(getUserInfo(data));
      })
      .catch(() => {
        dispatch(
          setLoginStatus({
            status: false,
            errorMsg: '토큰이 만료되었습니다. 다시 로그인 해주세요',
          }),
        );
        history.replace('/login');
      });
  };
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
      .catch(err => {
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
        const profileUrl = getState().image.profileImg;

        apis
          .SignUp({ ...userInfo, profileImg: profileUrl })
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
      .then(() => {
        dispatch(getUserInfoDB());
        dispatch(
          setLoginStatus({
            status: true,
            errorMsg: '',
          }),
        );
      })
      .then(() => {
        history.replace('/');
      })
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
      .then(() => {
        delCookie();
      })
      .then(() => {
        dispatch(
          getUserInfo({ userId: null, nickname: null, profileImg: null }),
        );
      })
      .then(() => {
        history.replace('/login');
      })
      .catch(err => console.error(err));
  };
};

export default handleActions(
  {
    [GET_USER_INFO]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
      }),

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
  },
  initialState,
);

const UserCreators = {
  getUserInfoDB,
  smsAuthDB,
  phoneAuthDB,
  duplicateIdCheckDB,
  duplicateNickCheckDB,
  signUpDB,
  logInDB,
  logOutDB,
};

export { UserCreators };

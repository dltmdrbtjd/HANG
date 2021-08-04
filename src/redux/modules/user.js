import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';
// cookie
import { getCookie, setCookie, delCookie } from '../../shared/cookie';

const AUTH = 'user/AUTH';
const LOG_OUT = 'user/LOG_OUT';
const CHECK_LOGGED_IN = 'user/CHECK_LOGGED_IN';
const DUP_ID_CHECK = 'user/DUP_ID_CHECK';
const DUP_NICK_CHECK = 'user/DUP_NICK_CHECK';

const userAuth = createAction(AUTH, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const checkSuccessfulLogin = createAction(CHECK_LOGGED_IN, isSuccess => ({
  isSuccess,
}));
const dupIdCheck = createAction(DUP_ID_CHECK);
const dupNickCheck = createAction(DUP_NICK_CHECK);

const initialState = {
  userInfo: {
    userId: null,
    nickname: null,
    profileImg: null,
  },

  loginSuccess: Boolean(getCookie()),

  duplicateCheck: {
    idChecked: false,
    nickChecked: false,
  },
};

const userAuthDB = () => {
  return dispatch => {
    apis
      .Auth()
      .then(res => {
        dispatch(userAuth(res.data));
      })
      .catch(() => {
        dispatch(checkSuccessfulLogin(false));
      });
  };
};

const smsAuthDB = phone => {
  apis.SMSAuth(phone).catch(err => console.error(err));
};

const phoneAuthDB = authInfo => {
  apis.Pauth(authInfo).catch(err => console.error(err));
};

const duplicateIdCheckDB = userId => {
  return dispatch => {
    apis
      .Duplicate(userId)
      .then(res => {
        dispatch(dupIdCheck(res.data));
      })
      .catch(err => console.error(err));
  };
};

const duplicateNickCheckDB = nickname => {
  return dispatch => {
    apis
      .Duplicate(nickname)
      .then(res => {
        dispatch(dupNickCheck(res.data));
      })
      .catch(err => console.log(err));
  };
};

const signUpDB = (image, userInfo) => {
  return (dispatch, getState, { history }) => {
    if (!image) {
      apis
        .SignUp(userInfo)
        .then(() => {
          history.replace('/welcome');
        })
        .catch(err => console.log(err));

      return;
    }

    dispatch(
      ImageCreators.uploadProfileImgDB(image, () => {
        const profileUrl = getState().image.profileImg;

        apis
          .SignUp({ ...userInfo, profileImg: profileUrl })
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
        dispatch(userAuthDB());
        dispatch(checkSuccessfulLogin(true));
        history.replace('/');
      })
      .catch(() => {
        dispatch(checkSuccessfulLogin(false));
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
        dispatch(logOut({ userId: null, nickname: null, profileImg: null }));
        dispatch(checkSuccessfulLogin(false));
        history.replace('/login');
      })
      .catch(err => console.error(err));
  };
};

export default handleActions(
  {
    [AUTH]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.user;
      }),

    [CHECK_LOGGED_IN]: (state, action) =>
      produce(state, draft => {
        draft.loginSuccess = action.payload.isSuccess;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.user;
        draft.loginSuccess = false;
      }),

    [DUP_ID_CHECK]: state =>
      produce(state, draft => {
        draft.isIdChecked = true;
      }),

    [DUP_NICK_CHECK]: state =>
      produce(state, draft => {
        draft.isNickChecked = true;
      }),
  },
  initialState,
);

const UserCreators = {
  userAuthDB,
  smsAuthDB,
  phoneAuthDB,
  duplicateIdCheckDB,
  duplicateNickCheckDB,
  signUpDB,
  logInDB,
  logOutDB,
};

export { UserCreators };

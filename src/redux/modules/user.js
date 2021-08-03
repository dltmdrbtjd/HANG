import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';

const AUTH = 'user/AUTH';
const LOG_OUT = 'user/LOG_OUT';
const DUP_ID_CHECK = 'user/DUP_ID_CHECK';
const DUP_NICK_CHECK = 'user/DUP_NICK_CHECK';

const userAuth = createAction(AUTH, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const dupIdCheck = createAction(DUP_ID_CHECK);
const dupNickCheck = createAction(DUP_NICK_CHECK);

const initialState = {
  userInfo: {
    userId: null,
    nickname: null,
    profileImg: null,
  },
  isLogin: false,
  isIdChecked: false,
  idNickChecked: false,
};

const userAuthDB = () => {
  return (dispatch, getState, { history }) => {
    apis
      .Auth()
      .then(res => {
        dispatch(userAuth(res.data));
      })
      .catch(() => {
        history.replace('/login');
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
        console.log(res);
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
        console.log(res);
        dispatch(dupNickCheck(res.data));
      })
      .catch(err => console.log(err));
  };
};

const signUpDB = (image, userInfo) => {
  return (dispatch, getState) => {
    if (!image) {
      apis
        .SignUp(userInfo)
        .then(res => {
          console.log(res);
          console.log(userInfo);
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
  return dispatch => {
    console.log(userInfo);

    apis
      .Login(userInfo)
      .then(res => {
        console.log(res);
        dispatch(userAuthDB());
      })
      .catch(err => {
        console.error(err);
      });
  };
};

const logOutDB = () => {
  return dispatch => {
    dispatch(logOut({ userId: null, nickname: null, profileImg: null }));
  };
};

export default handleActions(
  {
    [AUTH]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.user;
        draft.isLogin = true;
      }),

    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.user;
        draft.isLogin = false;
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

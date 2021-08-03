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
const dupIdCheck = createAction(DUP_ID_CHECK, isIdChecked => ({ isIdChecked }));
const dupNickCheck = createAction(DUP_NICK_CHECK, isNickChecked => ({
  isNickChecked,
}));

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
  return function (dispatch) {
    apis
      .Auth()
      .then(res => {
        dispatch(userAuth(res.data));
      })
      .catch(err => {
        console.error(err);
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
  return function (dispatch) {
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
  return function (dispatch) {
    apis
      .Duplicate(nickname)
      .then(res => {
        console.log(res);
        dispatch(dupNickCheck(res.data));
      })
      .catch(err => console.log(err));
  };
};

const signUpDB = userInfo => {
  // if (!image) {
  //   console.log(userInfo);

  // }

  apis
    .SignUp(userInfo)
    .then(res => {
      console.log(res);
      console.log(userInfo);
    })
    .catch(err => console.log(err));
};

// return function (dispatch, getState) {
//   dispatch(
//     ImageCreators.uploadProfileImgDB(image, () => {
//       const profileUrl = getState().image.profileImg;

//       apis
//         .SignUp({ ...userInfo, profileImg: profileUrl })
//         .catch(err => console.log(err));
//     }),
//   );
// };

const logInDB = userInfo => {
  return function (dispatch) {
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
  return function (dispatch) {
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

    [DUP_ID_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.isIdChecked = action.payload.isIdChecked;
      }),

    [DUP_NICK_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.isNickChecked = action.payload.isNickChecked;
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

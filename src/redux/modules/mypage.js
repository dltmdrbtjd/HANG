import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';

const GET_MY_INFO = 'mypage/GET_MY_INFO';
const GET_MY_TRIP_INFO = 'mypage/GET_MY_TRIP_INFO';
const CREATE_TRIP_EVENT = 'mypage/CREATE_TRIP_EVENT';
const GET_PROMISE_RECEIVED = 'mypage/GET_PROMISE_RECEIVED';
const GET_PROMISE_REQUESTED = 'mypage/GET_PROMISE_REQUESTED';
const GET_PROMISE_CONFIRMED = 'mypage/GET_PROMISE_CONFIRMED';

const getMyInfo = createAction(GET_MY_INFO, myInfo => ({ myInfo }));
const getMyTripInfo = createAction(GET_MY_TRIP_INFO, tripInfo => ({
  tripInfo,
}));
const createTripEvent = createAction(CREATE_TRIP_EVENT, tripInfo => ({
  tripInfo,
}));
const getRecProm = createAction(GET_PROMISE_RECEIVED, receivedProm => ({
  receivedProm,
}));
const getReqProm = createAction(GET_PROMISE_REQUESTED, requestedProm => ({
  requestedProm,
}));
const getConfirmedProm = createAction(GET_PROMISE_CONFIRMED, confirmedProm => ({
  confirmedProm,
}));

const initialState = {
  myInfo: {},
  tripList: [],
  receivedProm: [],
  requestedProm: [],
  confirmedProm: [],
};

const GetMyInfoDB = () => {
  return dispatch => {
    apis
      .GetMyInfo()
      .then(({ data }) => {
        dispatch(getMyInfo(data.userInfo));
        dispatch(getMyTripInfo(data.tripInfo));
        dispatch(getConfirmedProm(data.confirmed));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const CreateTripEventDB = tripInfo => {
  return (dispatch, getState, { history }) => {
    apis
      .CreateTripEvent(tripInfo)
      .then(({ data }) => {
        dispatch(createTripEvent({ ...tripInfo, tripId: data.newTripId }));
      })
      .then(() => {
        history.goBack();
      })
      .catch(err => console.log(err));
  };
};

const GetMyPromiseDB = () => {
  return dispatch => {
    apis
      .GetMyPromise()
      .then(({ data }) => {
        dispatch(getRecProm(data.received));
        dispatch(getReqProm(data.requested));
      })
      .catch(err => console.log(err));
  };
};

const UpdateProfileDB = (image, profile) => {
  return (dispatch, getState, { history }) => {
    const myInfo = { ...getState().mypage.myInfo, ...profile };

    if (!image) {
      apis
        .UpdateProfile(profile)
        .then(() => {
          dispatch(getMyInfo(myInfo));
        })
        .then(() => {
          history.replace('/mypage');
        })
        .catch(err => console.log(err));

      return;
    }

    dispatch(
      ImageCreators.uploadProfileImgDB(image, () => {
        const profileImg = getState().image.profileImg;

        apis
          .UpdateProfile({ ...profile, profileImg })
          .then(() => {
            dispatch(getMyInfo({ ...myInfo, profileImg }));
          })
          .then(() => {
            history.replace('/mypage');
          })
          .catch(err => console.log(err));
      }),
    );
  };
};

const ToggleGuideDB = () => {
  apis.GuideToggle().catch(err => console.log(err));
};

export default handleActions(
  {
    [GET_MY_INFO]: (state, action) =>
      produce(state, draft => {
        draft.myInfo = action.payload.myInfo;
      }),

    [GET_MY_TRIP_INFO]: (state, action) =>
      produce(state, draft => {
        draft.tripList = action.payload.tripInfo;
      }),

    [CREATE_TRIP_EVENT]: (state, action) =>
      produce(state, draft => {
        draft.tripList.push(action.payload.tripInfo);
      }),

    [GET_PROMISE_RECEIVED]: (state, action) =>
      produce(state, draft => {
        draft.receivedProm = action.payload.receivedProm;
      }),

    [GET_PROMISE_REQUESTED]: (state, action) =>
      produce(state, draft => {
        draft.requestedProm = action.payload.requestedProm;
      }),

    [GET_PROMISE_CONFIRMED]: (state, action) =>
      produce(state, draft => {
        draft.confirmedProm = action.payload.confirmedProm;
      }),
  },
  initialState,
);

const MypageCreators = {
  GetMyInfoDB,
  GetMyPromiseDB,
  UpdateProfileDB,
  CreateTripEventDB,
  ToggleGuideDB,
};

export { MypageCreators };

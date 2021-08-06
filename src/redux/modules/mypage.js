import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';
// reducer
import { ImageCreators } from './image';

const GET_MY_INFO = 'mypage/GET_MY_INFO';
const GET_MY_TRIP_INFO = 'mypage/GET_MY_TRIP_INFO';
const CREATE_TRIP_EVENT = 'mypage/CREATE_TRIP_EVENT';
const DELETE_TRIP_EVENT = 'mypage/DELETE_TRIP_EVENT';
const GET_MY_PROMISE = 'mypage/GET_PROMISE_RECEIVED';

const getMyInfo = createAction(GET_MY_INFO, myInfo => ({ myInfo }));
const getMyTripInfo = createAction(GET_MY_TRIP_INFO, tripInfo => ({
  tripInfo,
}));
const createTripEvent = createAction(CREATE_TRIP_EVENT, tripInfo => ({
  tripInfo,
}));
const deleteTripEvent = createAction(DELETE_TRIP_EVENT, tripId => ({ tripId }));
const getMyPromise = createAction(GET_MY_PROMISE, promise => ({
  promise,
}));

const initialState = {
  myInfo: {},
  tripList: [],
  promise: {
    received: [],
    requested: [],
    confirmed: [],
  },
};

const GetMyInfoDB = () => {
  return (dispatch, getState) => {
    const myPromise = getState().mypage.promise;

    apis
      .GetMyInfo()
      .then(({ data }) => {
        dispatch(getMyInfo(data.userInfo));
        dispatch(getMyTripInfo(data.tripInfo));
        dispatch(getMyPromise({ ...myPromise, confirmed: data.confirmed }));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const GetMyPromiseDB = () => {
  return (dispatch, getState) => {
    const myPromise = getState().mypage.promise;

    apis
      .GetMyPromise()
      .then(({ data }) => {
        dispatch(
          getMyPromise({
            ...myPromise,
            received: data.received,
            requested: data.requested,
          }),
        );
      })
      .catch(err => console.log(err));
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

const DeleteTripEventDB = tripId => {
  return dispatch => {
    apis
      .DeleteTripEvent(tripId)
      .then(() => {
        dispatch(deleteTripEvent(tripId.tripId));
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

const AgreePromiseDB = id => {
  return (dispatch, getState) => {
    const promise = getState().mypage.promise;

    apis.AgreePromise({ ...id }).then(() => {
      const receivedProm = promise.received.filter(
        prom => prom.tripId !== id.tripId,
      );
    });
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

    [DELETE_TRIP_EVENT]: (state, action) =>
      produce(state, draft => {
        draft.tripList = draft.tripList.filter(
          trip => trip.tripId !== action.payload.tripId,
        );
        console.log(draft.tripList, action.payload.tripId);
      }),

    [GET_MY_PROMISE]: (state, action) =>
      produce(state, draft => {
        draft.promise = action.payload.promise;
      }),
  },
  initialState,
);

const MypageCreators = {
  GetMyInfoDB,
  GetMyPromiseDB,
  UpdateProfileDB,
  CreateTripEventDB,
  DeleteTripEventDB,
  ToggleGuideDB,
};

export { MypageCreators };

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
const REJECT_PROMISE = 'mypage/REJECT_PROMISE';

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
const rejectPromise = createAction(REJECT_PROMISE, (type, requestId) => ({
  type,
  requestId,
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
  return dispatch => {
    apis
      .GetMyInfo()
      .then(({ data }) => {
        dispatch(getMyInfo(data.userInfo));
        dispatch(getMyTripInfo(data.tripInfo));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

const GetMyPromiseDB = () => {
  return dispatch => {
    apis
      .GetMyPromise()
      .then(({ data }) => {
        dispatch(getMyPromise(data));
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
      .catch(err => console.log(err.config));
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

const AgreePromiseDB = (tripInfo, id) => {
  return (dispatch, getState) => {
    apis
      .AgreePromise({ ...id })
      .then(() => {
        const promise = getState().mypage.promise;
        const receivedProm = promise.received.filter(
          prom => prom.tripId !== id.tripId,
        );
        const confirmedProm = [
          ...promise.confirmed,
          { ...tripInfo, guide: false },
        ];

        dispatch(
          getMyPromise({
            ...promise,
            received: receivedProm,
            confirmed: confirmedProm,
          }),
        );
      })
      .catch(err => console.log(err));
  };
};

const RejectPromiseDB = (type, reqId) => {
  return dispatch => {
    apis
      .RejectPromise(reqId)
      .then(() => {
        dispatch(rejectPromise(type, reqId));
      })
      .catch(err => console.log(err));
  };
};

const CancelConfirmedPromDB = tripId => {
  return (dispatch, getState) => {
    apis
      .CancelPromise(tripId)
      .then(() => {
        const promise = getState().mypage.promise;
        const confirmedProm = promise.confirmed.filter(
          trip => trip.tripId !== tripId.tripId,
        );

        dispatch(getMyPromise({ ...promise, confirmed: confirmedProm }));
      })
      .catch(err => console.log(err));
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
      }),

    [GET_MY_PROMISE]: (state, action) =>
      produce(state, draft => {
        draft.promise = action.payload.promise;
      }),

    [REJECT_PROMISE]: (state, action) =>
      produce(state, draft => {
        draft.promise[action.payload.type] = draft.promise[
          action.payload.type
        ].filter(trip => trip.requestId !== action.payload.requestId);
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
  AgreePromiseDB,
  RejectPromiseDB,
  CancelConfirmedPromDB,
};

export { MypageCreators };

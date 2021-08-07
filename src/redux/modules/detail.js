import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import apis from '../../shared/api';

const LOAD = 'detail/LOAD';
const MYTRAVELE_LOAD = 'detail/MYTRAVEL_LOAD';
const SUCCESS = 'detail/SUCCESS';
const LIKEUPDATE = 'detail/LIKEUPDATE';

const DetailLoad = createAction(LOAD, (userInfo, tripInfo) => ({
  userInfo,
  tripInfo,
}));
const MyTravelLoad = createAction(MYTRAVELE_LOAD, myTrip => ({ myTrip }));
const SuccessValue = createAction(SUCCESS, success => ({ success }));
const LikeUpdate = createAction(LIKEUPDATE, like => ({ like }));

const initialState = {
  userInfo: {},
  tripInfo: [],
  myTripInfo: [],
  success: false,
};

const DetailLoadDB = userPk => {
  return dispatch => {
    apis
      .UserDetail(userPk)
      .then(res => {
        const data = res.data;
        dispatch(DetailLoad(data.userInfo, data.tripInfo));
      })
      .catch(err => console.error(err));
  };
};

const MyTripInfoDB = () => {
  return dispatch => {
    apis
      .MyPromise()
      .then(res => {
        const data = res.data;
        dispatch(MyTravelLoad(data));
        dispatch(SuccessValue(false));
      })
      .catch(err => console.error(err));
  };
};

const AddTravel = TripInfo => {
  return (dispatch, getState, { history }) => {
    apis
      .GuideRequest(TripInfo)
      .then(res => {
        dispatch(SuccessValue(true));
        history.goBack();
      })
      .catch(err =>
        window.alert('선택한 여행일정은 해당유저에게 이미 신청하셨습니다.'),
      );
  };
};

const AddGuide = TripInfo => {
  return dispatch => {
    apis
      .DoGuide({ tripId: TripInfo })
      .then(res => {
        dispatch(SuccessValue(true));
      })
      .catch(err => {
        window.alert(err.response.data.errorMessage);
        dispatch(SuccessValue(false));
      });
  };
};

const LikeUpdateHandler = like => {
  return dispatch => {
    dispatch(LikeUpdate(like));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
        draft.tripInfo = action.payload.tripInfo;
      }),
    [MYTRAVELE_LOAD]: (state, action) =>
      produce(state, draft => {
        draft.myTripInfo = action.payload.myTrip;
      }),
    [SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.success = action.payload.success;
      }),
    [LIKEUPDATE]: (state, action) =>
      produce(state, draft => {
        draft.userInfo.like = action.payload.like;
      }),
  },
  initialState,
);

const DetailCreators = {
  DetailLoadDB,
  MyTripInfoDB,
  AddTravel,
  AddGuide,
  SuccessValue,
  LikeUpdateHandler,
};

export { DetailCreators };

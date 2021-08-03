import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const LOAD = 'detail/LOAD';
const ADDTRAVELE = 'detail/ADDTRAVELE';
const ADDGUIDE = 'detail/ADDGUIDE';

const DetailLoad = createAction(LOAD, (userInfo, tripInfo, myTripInfo) => ({
  userInfo,
  tripInfo,
  myTripInfo,
}));

const initialState = {
  userInfo: {},
  tripInfo: [],
  myTripInfo: [],
};

const DetailLoadDB = () => {
  return dispatch => {
    dispatch(DetailLoad());
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
        draft.tripInfo = action.payload.tripInfo;
        darft.myTripInfo = action.payload.myTripInfo;
      }),
  },
  initialState,
);

const DetailCreators = { DetailLoadDB };

export { DetailCreators };

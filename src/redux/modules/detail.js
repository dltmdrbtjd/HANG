import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import apis from '../../shared/api';

const LOAD = 'detail/LOAD';
const ADDTRAVELE = 'detail/ADDTRAVELE';
const ADDGUIDE = 'detail/ADDGUIDE';

const DetailLoad = createAction(LOAD, (userInfo, tripInfo) => ({
  userInfo,
  tripInfo,
}));

const initialState = {
  userInfo: {},
  tripInfo: [],
  myTripInfo: [],
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

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.userInfo = action.payload.userInfo;
        draft.tripInfo = action.payload.tripInfo;
      }),
  },
  initialState,
);

const DetailCreators = { DetailLoadDB };

export { DetailCreators };

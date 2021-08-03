import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'home/LOAD';

const HomeLoad = createAction(
  LOAD,
  (confirmed, requested, guide, traveler) => ({
    confirmed,
    requested,
    guide,
    traveler,
  }),
);

const initialState = {
  confirmed: {},
  requested: [],
  guide: {},
  traveler: {},
};

// main home load시 사용
const HomeLoadDB = () => {
  return function (dispatch) {
    apis
      .MainLoad()
      .then(res => {
        const data = res.data;
        dispatch(
          HomeLoad(data.confirmed, data.requested, data.guide, data.traveler),
        );
      })
      .catch(err => console.log(err));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.confirmed = action.payload.confirmed;
        draft.requested = action.payload.requested;
        draft.guide = action.payload.guide;
        draft.traveler = action.payload.traveler;
      }),
  },
  initialState,
);

const HomeCreators = {
  HomeLoadDB,
};

export { HomeCreators };

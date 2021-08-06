import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'home/LOAD';
const LIKEUPDATE = 'home/LIKEUPDATE';

const HomeLoad = createAction(LOAD, (confirmed, guide, traveler) => ({
  confirmed,
  guide,
  traveler,
}));

const likeUpdate = createAction(LIKEUPDATE, (category, idx, like) => ({
  category,
  idx,
  like,
}));

const initialState = {
  confirmed: {},
  guide: [],
  traveler: [],
};

// main home load시 사용
const HomeLoadDB = () => {
  return dispatch => {
    apis
      .MainLoad()
      .then(res => {
        const data = res.data;
        console.log(data);
        dispatch(HomeLoad(data.confirmed, data.guide, data.traveler));
      })
      .catch(err => console.log(err));
  };
};

const likeUpdateHandler = (category, idx) => {
  return dispatch => {
    dispatch(likeUpdate(category, idx));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.confirmed = action.payload.confirmed;
        draft.guide = action.payload.guide;
        draft.traveler = action.payload.traveler;
      }),
    [LIKEUPDATE]: (state, action) =>
      produce(state, draft => {
        console.log(draft[action.payload.category]);
        draft[action.payload.category][action.payload.idx].like =
          action.payload.like;
      }),
  },
  initialState,
);

const HomeCreators = {
  HomeLoadDB,
  likeUpdateHandler,
};

export { HomeCreators };

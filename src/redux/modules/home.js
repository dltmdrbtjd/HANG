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

const likeUpdateHandler = (category, idx, like) => {
  return (dispatch, getState) => {
    dispatch(likeUpdate(category, idx, like));
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
        if (action.payload.category === 'guide') {
          draft.guide[action.payload.idx].like = action.payload.like;
        } else if (action.payload.category === 'traveler') {
          draft.traveler[action.payload.idx].like = action.payload.like;
        }
      }),
  },
  initialState,
);

const HomeCreators = {
  HomeLoadDB,
  likeUpdateHandler,
};

export { HomeCreators };

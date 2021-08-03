import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'favorite/load';
const TOGGLE = 'favorite/toggle';

const FavoriteLoad = createAction(LOAD, list => ({ list }));
const FavoriteToggle = createAction(TOGGLE, like => ({ like }));

const initialState = {
  list: [],
};

// 즐겨찾기 페이지 load시 사용
const FavoriteLoadDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .LikeLoad()
      .then(res => {
        console.log(res);
        dispatch(FavoriteLoad(res.data));
      })
      .catch(err => console.log(err));
  };
};

// 즐겨찾기 버튼 toggle시 사용
const FavoriteToggleDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(FavoriteToggle(like));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),
    [TOGGLE]: (state, action) => produce(state, draft => {}),
  },
  initialState,
);

const FavoriteCreators = {
  FavoriteLoadDB,
  FavoriteToggleDB,
};

export { FavoriteCreators };

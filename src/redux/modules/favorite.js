import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'favorite/load';
const DEL = 'favorite/delete';

const FavoriteLoad = createAction(LOAD, list => ({ list }));
const FavoriteDelete = createAction(DEL, userPk => ({ userPk }));

const initialState = {
  list: [],
  boolean: 0,
};

// 즐겨찾기 페이지 load시 사용
const FavoriteLoadDB = () => {
  return dispatch => {
    apis
      .LikeLoad()
      .then(res => {
        dispatch(FavoriteLoad(res.data));
      })
      .catch(err => console.log(err));
  };
};

// 즐겨찾기 버튼 toggle시 사용
const FavoriteToggle = targetPk => {
  return () => {
    apis
      .Like(targetPk)
      .then(() => {})
      .catch(err => console.error(err));
  };
};

const FavoriteDelHandler = userPk => {
  return dispatch => {
    dispatch(FavoriteDelete(userPk));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),
    [DEL]: (state, action) =>
      produce(state, draft => {
        let idx = draft.list.findIndex(i => i.userPk === action.payload.userPk);

        if (idx !== -1) {
          draft.list.splice(idx, 1);
        }
      }),
  },
  initialState,
);

const FavoriteCreators = {
  FavoriteLoadDB,
  FavoriteDelHandler,
  FavoriteToggle,
};

export { FavoriteCreators };

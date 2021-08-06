import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'favorite/load';
const ADD = 'favorite/add';
const DEL = 'favorite/delete';

const FavoriteLoad = createAction(LOAD, list => ({ list }));
const AddLike = createAction(ADD, boolean => ({ boolean }));
const DelLike = createAction(DEL, boolean => ({ boolean }));

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
        dispatch(FavoriteLoad(res.data.likeusers));
      })
      .catch(err => console.log(err));
  };
};

// 즐겨찾기 버튼 toggle시 사용
const FavoriteAddDB = targetPk => {
  return (dispatch, getState) => {
    let number = getState().favorite.boolean;
    apis
      .Like(targetPk)
      .then(() => {
        // dispatch(AddLike(number + 1));
      })
      .catch(err => console.error(err));
  };
};

const FavoriteDelDB = targetPk => {
  return (dispatch, getState) => {
    let number = getState().favorite.boolean;
    apis
      .UnLike({ data: targetPk })
      .then(() => {
        // dispatch(DelLike(number - 1));
      })
      .catch(err => console.error(err));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),
    // [ADD]: (state, action) =>
    //   produce(state, draft => {
    //     draft.boolean = action.payload.boolean;
    //   }),
    // [DEL]: (state, action) =>
    //   produce(state, draft => {
    //     draft.boolean = action.payload.boolean;
    //   }),
  },
  initialState,
);

const FavoriteCreators = {
  FavoriteLoadDB,
  FavoriteAddDB,
  FavoriteDelDB,
};

export { FavoriteCreators };

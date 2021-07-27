import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const LOAD = 'article/LOAD';

const ArticleLoad = createAction(LOAD, post => ({ post }));

const initialState = {
  list: [],
};

const ArticleLoadDB = () => {
  return function (dispatch) {
    dispatch(ArticleLoad);
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.post;
      }),
  },
  initialState,
);

const ArticleCreators = {
  ArticleLoadDB,
};

export { ArticleCreators };

import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'search/LOAD';
const SEARCH = 'search/SEND';
const LIKEUPDATE = 'search/LIKEUPDATE';

const SearchLoad = createAction(LOAD, list => ({ list }));
const SearchSend = createAction(SEARCH, content => ({ content }));
const LikeUpdate = createAction(LIKEUPDATE, (idx, like) => ({ idx, like }));

const initialState = {
  list: [],
};
// search page useEffect시 사용
const SearchLoadDB = MainSearch => {
  return dispatch => {
    apis
      .Search(MainSearch)
      .then(res => {
        const data = res.data;
        dispatch(SearchLoad(data));
      })
      .catch(err => console.log(err));
  };
};
// 검색버튼 클릭시 사용
const SearchSendDB = content => {
  return dispatch => {
    apis
      .Search(content)
      .then(res => {
        const data = res.data;
        dispatch(SearchSend(data));
      })
      .catch(err => console.log(err));
  };
};

const likeUpdateHandler = (idx, like) => {
  return dispatch => {
    dispatch(LikeUpdate(idx, like));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),
    [SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.content;
      }),
    [LIKEUPDATE]: (state, action) =>
      produce(state, draft => {
        draft.list.result[action.payload.idx].like = action.payload.like;
      }),
  },
  initialState,
);

const SearchCreators = {
  SearchLoadDB,
  SearchSendDB,
  likeUpdateHandler,
};

export { SearchCreators };

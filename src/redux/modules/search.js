import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'search/LOAD';
const SEARCH = 'search/SEND';
const LIKEUPDATE = 'search/LIKEUPDATE';
const GETMORESEARCH = 'search/GETMORESEARCH';

const SearchLoad = createAction(LOAD, (list, nextItem) => ({ list, nextItem }));
const SearchSend = createAction(SEARCH, (content, nextItem) => ({
  content,
  nextItem,
}));
const GetMoreSearch = createAction(GETMORESEARCH, (list, nextItem) => ({
  list,
  nextItem,
}));
const LikeUpdate = createAction(LIKEUPDATE, (idx, like) => ({ idx, like }));

const initialState = {
  list: [],
  nextItem: true,
};
// search page useEffect시 사용
const SearchLoadDB = MainSearch => {
  return dispatch => {
    apis
      .Search(MainSearch)
      .then(res => {
        const data = res.data.result;
        dispatch(SearchLoad(data, true));
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
        const data = res.data.result;
        dispatch(SearchSend(data, true));
      })
      .catch(err => console.log(err));
  };
};

const MoreSearchSendDB = content => {
  return dispatch => {
    apis
      .Search(content)
      .then(res => {
        const data = res.data.result;

        if (!data) {
          dispatch(GetMoreSearch({}, false));
          return;
        }

        dispatch(GetMoreSearch(data, true));
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
        draft.nextItem = action.payload.nextItem;
      }),
    [SEARCH]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.content;
        draft.nextItem = action.payload.nextItem;
      }),
    [LIKEUPDATE]: (state, action) =>
      produce(state, draft => {
        draft.list[action.payload.idx].like = action.payload.like;
      }),
    [GETMORESEARCH]: (state, action) =>
      produce(state, draft => {
        if (draft.list) {
          draft.list.push(...action.payload.list);
        }
        draft.nextItem = action.payload.nextItem;
      }),
  },
  initialState,
);

const SearchCreators = {
  SearchLoadDB,
  SearchSendDB,
  MoreSearchSendDB,
  likeUpdateHandler,
};

export { SearchCreators };

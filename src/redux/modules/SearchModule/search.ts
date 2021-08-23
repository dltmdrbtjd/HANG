import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// types
import { SearchState, like } from './type';

const initialState: SearchState = {
  list: [],
  loading: false,
  nextItem: false,
}

const fetchSearchLoad = createAsyncThunk('search/SEARCH_LOAD', async(MainSearch:any):Promise<any> => {
  try {
    const payload = {
        list: (await apis.Search(MainSearch)).data.result,
        nextItem: true,
    }
    return payload;
  } catch (err) {
    console.log(err);
    return false;
  }
})

const fetchSearchSend = createAsyncThunk('search/SEARCH_SEND', async(content: any):Promise<any> => {
  try {
    const payload = {
      list: (await apis.Search(content)).data.result,
      nextItem: true,
    }
    return payload;
  } catch (err) {
    console.log(err);
    return false;
  }
})

const fetchMoreSearch = createAsyncThunk('search/SEARCH_MORE', async(content: any):Promise<any> => {
  try {
    const response = (await apis.Search(content)).data.result;

    if(!response && response.length > 9){
      const payload = {
        list: {},
        nextItem: false,
      }
      return payload;
    }

    const payload = {
      list: response,
      nextItem: true,
    }
    return payload;
  } catch (err) {
    console.log(err);
    return false;
  }
})

const searchSlice = createSlice({
  name: 'saerch',
  initialState,
  reducers:{
    SearchLikeUpdate: (state, action: PayloadAction<like>) => {
      state.list[action.payload.idx].like = action.payload.like;
    }
  },
  extraReducers: {
    [fetchSearchLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchSearchLoad.fulfilled.type]: (state,action: PayloadAction<SearchState>) => {
      state.loading = false;
      state.list = action.payload.list;
      state.nextItem = action.payload.nextItem;
    },
    [fetchSearchLoad.rejected.type]: (state, action) => {
      state.loading = false;
      state.list = initialState.list;
      state.nextItem = action.payload;
    },
    [fetchSearchSend.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchSearchSend.fulfilled.type]: (state,action: PayloadAction<SearchState>) => {
      state.loading = false;
      state.list = action.payload.list;
      state.nextItem = action.payload.nextItem;
    },
    [fetchSearchSend.rejected.type]: (state,action) => {
      state.loading = false;
      state.list = initialState.list;
      state.nextItem = action.payload;
    },
    [fetchMoreSearch.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchMoreSearch.fulfilled.type]: (state,action: PayloadAction<SearchState>) => {
      state.loading = false;
      if(action.payload.list) {
        state.list.push(...action.payload.list);
      }
      state.nextItem = action.payload.nextItem;
    },
    [fetchMoreSearch.rejected.type]: (state,action) => {
      state.loading = false;
      state.list = initialState.list;
      state.nextItem = action.payload;
    },
  }
})

const SearchCreators = {
  fetchSearchLoad,
  fetchSearchSend,
  fetchMoreSearch,
}

export { SearchCreators }
const { reducer, actions } = searchSlice;
export const { SearchLikeUpdate } = actions;
export default reducer;
import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// types
import { favoriteType, favorite } from './type';

const initialState: favoriteType = {
  list: [],
  loading: false,
}

const fetchFavoriteLoad = createAsyncThunk('favorite/FAVORITE_LOAD', async () => {
  try {
    const response = (await apis.LikeLoad()).data;
    return response;
  } catch (err) {
    return console.error(err);
  }
})

const fetchFavoriteToggle = createAsyncThunk('favorite/FAVORITE_TOGGLE', async (targetPk: any) => {
  try {
    await apis.LikeToggle(targetPk);
  } catch (err) {
    console.error(err);
  }
})

const favoriteSlice = createSlice({
  name:'favorite',
  initialState,
  reducers:{
    favoriteDelete: (state, action: PayloadAction<number>) => {
      const idx = state.list.findIndex(i => i.userPk === action.payload);

      if( idx !== -1) {
        state.list.splice(idx, 1);
      }
    }
  },
  extraReducers: {
    [fetchFavoriteLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchFavoriteLoad.fulfilled.type]: (state, action: PayloadAction<favorite>) => {
      state.loading = false;
      state.list = action.payload.list;
    },
    [fetchFavoriteLoad.rejected.type]: (state) => {
      state.loading = false;
      state.list = initialState.list;
    },
  }
});

const FavoriteCreators = {
  fetchFavoriteLoad,
  fetchFavoriteToggle,
}

export { FavoriteCreators };
const { reducer, actions } = favoriteSlice;
export const { favoriteDelete } = actions;
export default reducer;
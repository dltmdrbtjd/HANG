import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// apis
import apis from '../../../shared/api';
// types
import { homeType, home, like } from './type';

export const initialState: homeType = {
  HomeData: {
    confirmed: {},
    guide: [],
    traveler: [],
  },
  loading: false,
};

const fetchHomeLoad = createAsyncThunk('home/HOME_LOAD', async () => {
  try {
    const response = (await apis.MainLoad()).data;
    return response;
  } catch (err) {
    return console.log(err);
  }
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    HomeLikeUpdate: (state, action: PayloadAction<like>) => {
      let TraveleDoubleCheck;
      let GuideDoubleCheck;

      if (state.HomeData.guide.length > 0) {
        TraveleDoubleCheck = state.HomeData.traveler.findIndex(
          (i) => i.userPk === state.HomeData.guide[action.payload.idx].userPk,
        );
      }
      if (state.HomeData.traveler.length > 0) {
        GuideDoubleCheck = state.HomeData.guide.findIndex(
          (i) =>
            i.userPk === state.HomeData.traveler[action.payload.idx].userPk,
        );
      }

      if (action.payload.category === 'guide') {
        state.HomeData.guide[action.payload.idx].like = action.payload.like;
        if (TraveleDoubleCheck !== -1) {
          state.HomeData.traveler[TraveleDoubleCheck].like =
            action.payload.like;
        }
      } else if (action.payload.category === 'traveler') {
        state.HomeData.traveler[action.payload.idx].like = action.payload.like;
        if (GuideDoubleCheck !== -1) {
          state.HomeData.guide[GuideDoubleCheck].like = action.payload.like;
        }
      }
    },
  },
  extraReducers: {
    [fetchHomeLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchHomeLoad.fulfilled.type]: (state, action: PayloadAction<home>) => {
      state.loading = false;
      state.HomeData = action.payload;
    },
    [fetchHomeLoad.rejected.type]: (state) => {
      state.loading = false;
      state.HomeData = initialState.HomeData;
    },
  },
});

const HomeCreators = {
  fetchHomeLoad,
};

export { HomeCreators };
const { reducer, actions } = homeSlice;
export const { HomeLikeUpdate } = actions;
export default reducer;

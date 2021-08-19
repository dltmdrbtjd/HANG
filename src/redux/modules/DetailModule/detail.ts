import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
// api
import apis from 'src/shared/api';
// types
import { DetailState, DetailLoadState, MyTripInfo } from './type';

const initialState: DetailState = {
  myTripInfo: [],
  tripInfo: [],
  userInfo: {},
  loading: false,
}

const fetchDetailLoad = createAsyncThunk('detail/LOAD', async (userPk:string | string[]):Promise<any> => {
    try {
      const { data } = (await apis.UserDetail(Number(userPk)));
      const payload = {
        userinfo: data.userInfo,
        tripinfo: data.tripInfo,
      }
      return payload;
    } catch(err) {
      console.log(err);
      return false;
    }
});

const fetctMyTripInfo = createAsyncThunk('detail/MYTRIP_LOAD', async () => {
  try {
    const { data } = (await apis.MyPromise());
    return data;
  } catch(err) {
    console.log(err)
    return false;
  }
});

const detailSlice = createSlice({
  name:'detail',
  initialState,
  reducers:{
    DetailLikeUpdate: (state,action: PayloadAction<boolean>) => {
      state.userInfo.like = action.payload;
    }
  },
  extraReducers:{
    [fetchDetailLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchDetailLoad.fulfilled.type]: (state, action: PayloadAction<DetailLoadState>) => {
      state.loading = false;
      state.userInfo = action.payload.userinfo;
      state.tripInfo = action.payload.tripinfo;
    },
    [fetchDetailLoad.rejected.type]: (state) => {
      state.loading = false;
      state.userInfo = initialState.userInfo;
      state.tripInfo = initialState.tripInfo;
    },
    [fetctMyTripInfo.pending.type]: (state) => {
      state.loading = true;
    },
    [fetctMyTripInfo.fulfilled.type]: (state, action: PayloadAction<MyTripInfo[]>) => {
      state.loading = false;
      state.myTripInfo = action.payload;
    },
    [fetctMyTripInfo.rejected.type]: (state) => {
      state.loading = false;
      state.myTripInfo = initialState.myTripInfo;
    }
  }
})

const DetailCreators = {
  fetchDetailLoad,
  fetctMyTripInfo
}

export { DetailCreators };
const { reducer, actions } = detailSlice;
export const { DetailLikeUpdate } = actions;
export default reducer;

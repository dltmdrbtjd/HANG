import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// types
import {
  TripInfo,
  AgreeProm,
  RejectProm,
  PromInfo,
  MyInfo,
  MyPromise,
  MyPageState,
} from './type';

export const initialState: MyPageState = {
  myInfo: {},
  tripList: [],
  promise: {
    received: [],
    requested: [],
    confirmed: [],
  },
  loading: false,
};

const fetchGetMyInfo = createAsyncThunk(
  'mypage/GET_MY_INFO',
  async (): Promise<any> => {
    try {
      const { data } = await apis.GetMyInfo();
      const payload = {
        myInfo: data.userInfo,
        tripList: data.tripInfo,
      };

      return payload;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
);

const fetchGetMyPromise = createAsyncThunk(
  'mypage/GET_MY_PROMISE',
  async (): Promise<any> => {
    try {
      const { data } = await apis.GetMyPromise();
      const payload = {
        received: data.received,
        requested: data.requested,
        confirmed: data.confirmed,
      };

      return payload;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
);

const mypageSlice = createSlice({
  name: 'mypage',
  initialState,
  reducers: {
    DeleteTripEvent: (state, action: PayloadAction<number>) => {
      state.tripList = state.tripList.filter(
        (trip) => trip.tripId !== action.payload,
      );
    },

    CreateTripEvent: (state, action: PayloadAction<TripInfo>) => {
      state.tripList.push(action.payload);
    },

    AgreePromise: (state, action: PayloadAction<AgreeProm>) => {
      state.promise.received = state.promise.received.filter(
        (prom) => prom.tripId !== action.payload.tripId,
      );

      state.promise.confirmed.push(action.payload.tripInfo);
    },

    RejectPromise: (state, action: PayloadAction<RejectProm>) => {
      state.promise[action.payload.type] = state.promise[
        action.payload.type
      ].filter((prom: PromInfo) => prom.requestId !== action.payload.requestId);
    },

    CancelPromise: (state, action: PayloadAction<number>) => {
      state.promise.confirmed = state.promise.confirmed.filter(
        (prom: PromInfo) => prom.tripId !== action.payload,
      );
    },
  },
  extraReducers: {
    [fetchGetMyInfo.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchGetMyInfo.fulfilled.type]: (state, action: PayloadAction<MyInfo>) => {
      state.loading = false;
      state.myInfo = action.payload.myInfo;
      state.tripList = action.payload.tripList;
    },
    [fetchGetMyInfo.rejected.type]: (state) => {
      state.loading = false;
    },

    [fetchGetMyPromise.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchGetMyPromise.fulfilled.type]: (
      state,
      action: PayloadAction<MyPromise>,
    ) => {
      state.loading = false;
      state.promise = action.payload;
    },
    [fetchGetMyPromise.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

const MyPageCreators = {
  fetchGetMyInfo,
  fetchGetMyPromise,
};

export { MyPageCreators };
const { reducer, actions } = mypageSlice;
export const {
  DeleteTripEvent,
  CreateTripEvent,
  AgreePromise,
  RejectPromise,
  CancelPromise,
} = actions;
export default reducer;

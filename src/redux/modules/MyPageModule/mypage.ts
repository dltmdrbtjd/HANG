import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// moment
import moment from 'moment';
// types
import { RootState } from 'src/redux/configureStore';
import {
  TripInfo,
  AgreeProm,
  RejectProm,
  PromInfo,
  MyInfo,
  MyPromise,
  MyPageState,
  DisabledDate,
} from './type';

export const initialState: MyPageState = {
  myInfo: {
    age: '',
    city: '',
    gender: 0,
    guide: 0,
    intro: '',
    nickname: '',
    profileImg: null,
    region: '',
    userId: '',
    userPk: 0,
  },
  tripList: [],
  promise: {
    received: [],
    requested: [],
    confirmed: [],
  },
  blockedUser: {
    blockedUsers: [],
    blockedPk: [],
  },
  loading: false,
};

const fetchGetMyInfo = createAsyncThunk(
  'mypage/GET_MY_INFO',
  async (userPk: number): Promise<any> => {
    try {
      const { data } = await apis.GetUserInfo(userPk);
      const payload = {
        myInfo: data.userInfo,
        tripList: data.tripInfo ? data.tripInfo : [],
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

const fetchGetBlockList = createAsyncThunk(
  'mypage/GET_BLOCK_LIST',
  async (): Promise<any> => {
    try {
      const { data } = await apis.GetBlockList();
      const payload = {
        blockedUsers: data ? data.blockedUsers : [],
        blockedPk: data ? data.blockedPk : [],
      };
      console.log(data);

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
    UpdateProfile: (state, action: PayloadAction<MyInfo>) => {
      state.myInfo = action.payload;
    },

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

    DeleteBlockList: (state, action: PayloadAction<number>) => {
      state.blockedUser.blockedUsers = state.blockedUser.blockedUsers.filter(
        (block) => block.userPk !== action.payload,
      );
    },

    SetGuideToggle: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.myInfo.guide = action.payload;
    },
  },
  extraReducers: {
    [fetchGetMyInfo.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchGetMyInfo.fulfilled.type]: (
      state,
      action: PayloadAction<{ myInfo: MyInfo; tripList: TripInfo[] }>,
    ) => {
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

    [fetchGetBlockList.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchGetBlockList.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.blockedUser = action.payload;
    },
    [fetchGetBlockList.rejected.type]: (state) => {
      state.loading = false;
    },
  },
});

export const getDisabledDates = createSelector(
  (state: RootState) => state.mypage.tripList,
  (state: RootState) => state.mypage.promise.confirmed,
  (tripList, confirmed) => {
    const format = 'YYYY-MM-DD';
    const tripListDates = tripList.reduce(
      (acc: DisabledDate[], cur: TripInfo) => {
        acc.push({
          startDate: moment.utc(cur.startDate).format(format),
          endDate: moment.utc(cur.endDate).format(format),
        });

        return acc;
      },
      [],
    );
    const confirmedDates = confirmed.reduce(
      (acc: DisabledDate[], cur: PromInfo) => {
        acc.push({
          startDate: moment.utc(cur.startDate).format(format),
          endDate: moment.utc(cur.endDate).format(format),
        });

        return acc;
      },
      [],
    );

    return tripListDates.concat(confirmedDates);
  },
);

const MyPageCreators = {
  fetchGetMyInfo,
  fetchGetMyPromise,
  fetchGetBlockList,
};

export { MyPageCreators };
const { reducer, actions } = mypageSlice;
export const {
  UpdateProfile,
  DeleteTripEvent,
  CreateTripEvent,
  AgreePromise,
  RejectPromise,
  CancelPromise,
  DeleteBlockList,
  SetGuideToggle,
} = actions;
export default reducer;

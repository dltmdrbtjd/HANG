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
  BlockedUser,
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
    tags: '',
  },
  tripList: [],
  promise: {
    received: [],
    requested: [],
    confirmed: [],
  },
  blockedUsers: [],
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
      throw new Error(err);
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
      throw new Error(err);
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

      return payload;
    } catch (err) {
      throw new Error(err);
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

    AddBlockList: (state, action: PayloadAction<BlockedUser>) => {
      state.blockedUsers.unshift(action.payload);
    },

    DeleteBlockList: (state, action: PayloadAction<number>) => {
      state.blockedUsers = state.blockedUsers.filter(
        (block) => block.userPk !== action.payload,
      );
    },

    SetGuideToggle: (state, action: PayloadAction<number>) => {
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
      const blockedUsers = action.payload.blockedUsers.map(
        (userInfo: BlockedUser) => {
          const index = action.payload.blockedPk.findIndex(
            (userPk: number) => userPk === userInfo.userPk,
          );

          if (index === -1)
            return {
              userPk: userInfo.userPk,
              nickname: null,
              profileImg: null,
            };

          return userInfo;
        },
      );

      state.blockedUsers = blockedUsers;
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
    const registeredTripEvent = tripList.concat(confirmed);
    const disabledDates = registeredTripEvent.map((disabled) => {
      return {
        startDate: moment.utc(disabled.startDate).format(format),
        endDate: moment.utc(disabled.endDate).format(format),
      };
    });

    return disabledDates;
  },
);

export const getValidTripList = createSelector(
  (state: RootState) => state.mypage.tripList,
  (tripList) => {
    const validTripList = tripList.filter((tripInfo) => {
      const date = moment
        .duration(moment(tripInfo.endDate).add(9, 'hours').diff(moment()))
        .asDays();

      return date >= 0;
    });

    return validTripList;
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
  AddBlockList,
  DeleteBlockList,
  SetGuideToggle,
} = actions;
export default reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// apis
import apis from '../../shared/api';

// types
interface TraveleCard {
  age: string;
  city: string;
  gender: number;
  guide: number;
  intro: string;
  like: boolean;
  nickname: string;
  profileImg: null | string;
  region: string;
  userId: string;
  userPk: number;
}

interface Promise {
  profileImg: null | string;
  nickname: string;
  startDate: string;
  endDate: string;
}

interface home {
  confirmed: Promise;
  guide: TraveleCard[];
  traveler: TraveleCard[];
}

interface homeType {
  HomeData: {
    confirmed: Promise;
    guide: TraveleCard[];
    traveler: TraveleCard[];
  },
  loading: boolean,
}

export const initialState: homeType = {
  HomeData: {
    confirmed: null,
    guide: [],
    traveler: [],
  },
  loading: false,
}

export const fetchLoad = createAsyncThunk('home/HOME_LOAD', async () => {
  return apis
    .MainLoad()
    .then(res => res.data)
    .catch((err) => console.log(err));
})

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchLoad.fulfilled.type]: (state,action: PayloadAction<home>) => {
      state.loading = false;
      state.HomeData.confirmed = action.payload.confirmed;
    },
    [fetchLoad.rejected.type]: (state) => {
      state.loading = false;
      state.HomeData = initialState.HomeData;
    }
  }
});

const { reducer } = homeSlice;
export default reducer;
import { createReducer, createAction,  PayloadAction } from '@reduxjs/toolkit';
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

interface homeType {
  HomeData: {
    confirmed: Promise;
    guide: TraveleCard[];
    traveler: TraveleCard[];
  }
}

export const initalState: homeType = {
  HomeData: {
    confirmed: null,
    guide: [],
    traveler: [],
  }
}

const getLoadAction = createAction<unknown>('home/HOME_LOAD');

const HomeReducer = createReducer(initalState, {
  [getLoadAction.type]: (state: homeType ,action: PayloadAction<any>) => {
    state.HomeData = action.payload;
  }
})

const getMainData = () => async (dispatch, getState, {history}) => {
  try {
    const data = await apis.MainLoad();
    dispatch(getLoadAction(data));
  } catch (err) {
    console.error(err);
  }
}

export const homeActions = {
  getMainData,
}

export default HomeReducer;
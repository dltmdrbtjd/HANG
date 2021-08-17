import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

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

type homeType = {
  confirmed: Promise;
  guide: Array<TraveleCard>;
  traveler: Array<TraveleCard>;
}

const LOAD = 'home/LOAD';
const LIKE_UPDATE = 'home/LIKE_UPDATE';

const HomeLoad = createAction<unknown>(LOAD, (confirmed:Promise, guide:homeType, traveler:homeType) => ({
  confirmed
  ,guide
  ,traveler
}));

const LikeUpdate = createAction<unknown>(LIKE_UPDATE, (category: string, idx: number, like: boolean) => ({
  category
  ,idx
  ,like
}))
export interface TripInfo {
  city: string;
  endDate: string;
  partner: null | string;
  region: string;
  startDate: string;
  tripId: number;
  tripInfo: string;
  userPk: number;
}

export interface UserInfo {
  age: string;
  gender: number;
  guide: number;
  intro: string;
  like: boolean;
  nickname: string;
  profileImg: string;
  region: string;
  userId: string;
  userPk: number;
}

export interface MyTripInfo {
  city: string;
  endDate: string;
  partner: null | string;
  region: string;
  startDate: string;
  tripId: number;
  tripInfo: string;
  userPk: number;
}

export interface DetailLoadState {
  userinfo: UserInfo;
  tripinfo: TripInfo[];
}

export interface DetailState {
  myTripInfo: MyTripInfo[];
  tripInfo: TripInfo[];
  userInfo: any;
  loading: boolean;
}


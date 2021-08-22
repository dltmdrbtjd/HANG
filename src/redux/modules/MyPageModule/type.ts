// type
import { UserInfo } from '../DetailModule/type';

export interface TripInfo {
  tripId: number;
  userPk?: number;
  region: string;
  city: string;
  startDate: string;
  endDate: string;
  tripInfo: string;
  partner?: number;
}

export interface PromInfo {
  userPk: number;
  requestId?: number;
  profileImg: string | null;
  tripId: number;
  nickname: string;
  startDate: string;
  endDate: string;
  region: string;
  city: string;
  guide?: number;
}

export interface AgreeProm {
  tripId: number;
  tripInfo: PromInfo;
}

export interface RejectProm {
  type: string;
  requestId: number;
}

export interface MyInfo {
  myInfo: any;
  tripList: TripInfo[];
}

export interface MyPromise {
  received: PromInfo[];
  requested: PromInfo[];
  confirmed: PromInfo[];
}

export interface MyPageState {
  myInfo: any;
  tripList: TripInfo[];
  promise: MyPromise;
  blockList: any[];
  loading: boolean;
}

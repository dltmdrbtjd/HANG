export interface DisabledDate {
  startDate: string;
  endDate: string;
}

export interface TripInfo {
  tripId: number;
  userPk?: number;
  region: string;
  city: string;
  startDate: string;
  endDate: string;
  tripInfo?: string;
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

export interface BlockedUser {
  nickname: string;
  profileImg: string;
  userPk: number;
}

export interface MyInfo {
  age: string;
  city: string;
  gender: number;
  guide: number;
  intro: string;
  nickname: string;
  profileImg: string | null;
  region: string;
  userId: string;
  userPk: number;
  tags: string;
}

export interface MyPromise {
  received: PromInfo[];
  requested: PromInfo[];
  confirmed: PromInfo[];
}

export interface MyPageState {
  myInfo: MyInfo;
  tripList: TripInfo[];
  promise: MyPromise;
  blockedUser: {
    blockedUsers: BlockedUser[];
    blockedPk: string[];
  };
  loading: boolean;
}

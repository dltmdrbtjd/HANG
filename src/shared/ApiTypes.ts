// user module => api types
export type PhoneType = {
  pNum: string;
  status: number;
};

export type SignUpType = {
  userId: string;
  nickname: string;
  password: string;
  region: string;
  city: string;
  profileImg: string | null;
  age: number;
  gender: number;
  pNum: string;
};

export type PauthType = {
  pNum: string;
  aNum: string;
};

export type DuplicateType = {
  userId?: string;
  nickname?: string;
};

export type SignInType = {
  userId: string;
  password: string;
};

export type ForgotPwdType = {
  userId: string;
  newPassword: string;
};

export type ExistsType = {
  userId: string;
  pNum: string;
};

// detail module => api types
export type FavoriteType = {
  targetPk?: any;
  block?: number;
};

// search module => api types
export type SearchType = {
  keyword?: string;
  region?: string;
  city?: string;
  traveler?: boolean;
  guide?: boolean;
  pageNum?: number;
};

export type GuideRequestType = {
  pagePk: number;
  tripId: string;
  startDate: string;
  endDate: string;
};

export type DoGuideType = {
  tripId: number;
};

// myinfo module => api types
export type CreateTripEventType = {
  region: string;
  city: string;
  startDate: string;
  endDate: string;
  tripInfo: string;
};

export type DeleteTripEventType = {
  tripId: number;
};

export type UpdateProfileType = {
  nickname: string;
  profileImg: string;
  region: string;
  city: string;
  intro: string;
};

export type AgreePromiseType = {
  tripId: number;
  requestId: number;
};

export type RejectPromiseType = {
  requestId: number;
};

export type CancelPromiseType = {
  tripId: number;
};

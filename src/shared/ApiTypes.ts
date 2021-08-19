// user module => api types
export type SmsType = {
  pNum: string;
}

export type SignUpType = {
  userId: string;
  nickname: string;
  password: string;
  age: number;
  region: string;
  city: string;
  profileImg: string | null;
  gender: string;
  pNum: string;
}

export type PauthType = {
  pNum: string;
  aNum: string;
}

export type DuplicateType = {
  userId?: string;
  nickname?: string;
}

export type LoginType = {
  userId: string;
  password: string;
}

// search module => api types
export type SearchType = {
  keyword?: string;
  region?: string;
  city?: string;
  traveler?: boolean;
  guide?: boolean;
  pageNum?: number;
}

// detail module => api types

export type GuideRequestType = {
  pagePk: number;
  tripId: string;
  startDate: string;
  endDate: string;
}

export type DoGuideType = {
  tripId: number;
}

// myinfo module => api types
export type CreateTripEventType = {
  region: string;
  city: string;
  startDate: string;
  endDate: string;
  tripInfo: string;
}

export type DeleteTripEventType = {
  tripId: number;
}

export type UpdateProfileType = {
  nickname: string;
  profileImg: string;
  age: number;
  region: string;
  city: string;
  intro: string;
}

export type AgreePromiseType = {
  tripId: number;
  requestId: number;
}

export type RejectPromiseType = {
  requestId: number;
}

export type CancelPromiseType = {
  tripId: number;
}
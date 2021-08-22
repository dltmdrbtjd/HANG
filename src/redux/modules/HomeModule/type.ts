// types
export interface TraveleCard {
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

export interface Promise {
  profileImg: string;
  nickname: string;
  startDate: string;
  endDate: string;
}

export interface home {
  promise: Promise;
  guide: TraveleCard[];
  traveler: TraveleCard[];
}

export interface homeType {
  HomeData: {
    promise: any;
    guide: TraveleCard[];
    traveler: TraveleCard[];
  };
  loading: boolean;
}

export interface like {
  category: string;
  idx: number;
  like: boolean;
}

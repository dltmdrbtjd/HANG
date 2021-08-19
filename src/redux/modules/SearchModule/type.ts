export interface SearchInfo {
  age: string;
  city: string;
  gender: number;
  like: boolean;
  nickname: string;
  profileImg: string;
  region: string;
  userPk: number;
}

export interface SearchState {
  list: SearchInfo[];
  loading: boolean;
  nextItem: boolean;
}

export interface like {
  idx: number;
  like: boolean;
}
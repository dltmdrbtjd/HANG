export interface FavoriteUser {
  userPk: number;
  nickname: string;
  userId: string;
  region: string;
  city: string;
  age: string;
  guide: number;
  profileImg: string;
}

export interface favoriteType {
  list: FavoriteUser[];
  loading: boolean;
}

export interface NewMessage {
  userPk: number;
  message: string;
  time: number;
}

export interface LastChat {
  userPk?: number;
  message: string;
  curTime: number;
}

export interface ChatInfo {
  lastChat: string[] | LastChat[];
  nickname: string;
  profileImg: string;
  targetPk: number;
  unchecked: string;
}

export interface ChatState {
  alarmCount: number;
  list: ChatInfo[];
  loading: boolean;
}

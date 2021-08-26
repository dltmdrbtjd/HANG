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

export interface LoadChatInfo {
  lastChat: string[];
  nickname: string;
  profileImg: string;
  targetPk: number;
  unchecked: string;
}

export interface ReadChatInfo {
  lastChat: LastChat[];
  nickname: string;
  profileImg: string;
  targetPk: number;
  unchecked: number;
}

export interface ChatState {
  alarmCount: number;
  list: ReadChatInfo[];
  loading: boolean;
}

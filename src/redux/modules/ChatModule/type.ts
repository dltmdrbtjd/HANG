export interface NewMessage {
  userPk: number;
  message: string;
  time: number;
  roomIdx: number;
}

export interface NewRoom {
  nickname: string;
  profileImg: string | null;
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

export interface ShowChatInfo {
  lastChat: LastChat[];
  nickname: string;
  profileImg: string;
  targetPk: number;
  unchecked: number;
}

export interface ChatState {
  alarmCount: number;
  list: ShowChatInfo[];
  loading: boolean;
  newMessage: NewMessage;
}

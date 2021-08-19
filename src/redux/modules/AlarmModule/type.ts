export interface alarmData {
  checked: number;
  guide: true;
  nickname: string;
  profileImg: string;
}

export interface alarmState {
  list: alarmData[]
  loading: boolean;
}
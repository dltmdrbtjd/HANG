import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from 'src/redux/configureStore';
// apis
import apis from 'src/shared/api';
// type
import { LoadChatInfo, ReadChatInfo, NewMessage, ChatState } from './type';

export const initialState: ChatState = {
  alarmCount: 0,
  list: [],
  loading: false,
  newMessage: {
    userPk: null,
    message: null,
    time: null,
  },
};

const fetchGetChatRoomList = createAsyncThunk(
  'chat/GET_CHAT_ROOM',
  async () => {
    try {
      const { data } = await apis.GetChatRoom();
      const payload = data.result;

      return payload;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    ChatAlarmCheck: (state) => {
      if (state.alarmCount <= 0) {
        state.alarmCount = 1;
        return;
      }

      state.alarmCount += 1;
    },

    CheckChatAlarm: (state, action: PayloadAction<number>) => {
      const roomIdx = state.list.findIndex(
        (room) => room.targetPk === action.payload,
      );

      if (roomIdx === -1) return;

      const targetRoom = state.list[roomIdx];

      state.list[roomIdx] = { ...targetRoom, unchecked: 0 };

      if (state.alarmCount - targetRoom.unchecked <= 0) {
        state.alarmCount = 0;
        return;
      }

      state.alarmCount -= targetRoom.unchecked;
    },

    CreateChatRoom: (state, action) => {
      const roomIdx = state.list.findIndex(
        (room) => room.targetPk === state.newMessage.userPk,
      );

      if (roomIdx !== -1) return;

      const newChatRoom = {
        lastChat: [
          {
            message: state.newMessage.message,
            curTime: state.newMessage.time,
          },
        ],
        unchecked: 1,
        targetPk: state.newMessage.userPk,
        ...action.payload,
      };

      state.list.unshift(newChatRoom);
      state.alarmCount += 1;
    },

    ChatHistoryUpdate: (state, action: PayloadAction<NewMessage>) => {
      const chatLog = action.payload;
      const roomIdx = state.list.findIndex(
        (room) => room.targetPk === chatLog.userPk,
      );

      state.newMessage = chatLog;

      if (roomIdx === -1) return;

      const targetRoom = state.list[roomIdx];
      const updateRoom = {
        ...targetRoom,
        unchecked: targetRoom.unchecked + 1,
        lastChat: [
          {
            message: chatLog.message,
            curTime: chatLog.time,
          },
        ],
      };

      state.list.splice(roomIdx, 1);
      state.list.unshift(updateRoom);

      if (state.alarmCount <= 0) {
        state.alarmCount = 1;
        return;
      }

      state.alarmCount += 1;
    },
  },
  extraReducers: {
    [fetchGetChatRoomList.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchGetChatRoomList.fulfilled.type]: (
      state,
      action: PayloadAction<LoadChatInfo[]>,
    ) => {
      state.loading = false;

      const chatRoomList: ReadChatInfo[] = action.payload.map(
        (chat): ReadChatInfo => {
          if (!chat.lastChat[0]) {
            return {
              ...chat,
              lastChat: [],
              unchecked: parseInt(chat.unchecked, 10),
            };
          }

          return {
            ...chat,
            lastChat: [JSON.parse(chat.lastChat[0])],
            unchecked: parseInt(chat.unchecked, 10),
          };
        },
      );

      state.list = chatRoomList.sort((a, b) => {
        if (!(a.lastChat[0] && b.lastChat[0])) return 1;

        const aLastChat = a.lastChat[0];
        const bLastChat = b.lastChat[0];

        return bLastChat.curTime - aLastChat.curTime;
      });

      state.alarmCount = chatRoomList.reduce(
        (acc, cur) => acc + cur.unchecked,
        0,
      );
    },
  },
});

export const getRoomIdx = createSelector(
  (state: RootState) => state.chat.list,
  (state: RootState) => state.chat.newMessage,
  (chatInfoList, newMessage) => {
    const roomIdx = chatInfoList.findIndex(
      (room) => room.targetPk === newMessage.userPk,
    );

    return roomIdx;
  },
);

export const ChatCreators = {
  fetchGetChatRoomList,
};
const { reducer, actions } = chatSlice;
export const {
  ChatAlarmCheck,
  CheckChatAlarm,
  CreateChatRoom,
  ChatHistoryUpdate,
} = actions;
export default reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// type
import {
  LoadChatInfo,
  ShowChatInfo,
  NewMessage,
  NewRoom,
  ChatState,
} from './type';

export const initialState: ChatState = {
  alarmCount: 0,
  list: [],
  loading: false,
  newMessage: {
    userPk: null,
    message: null,
    time: null,
    roomIdx: null,
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

    CreateChatRoom: (state, action: PayloadAction<NewRoom>) => {
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
    },

    ChatHistoryUpdate: (state, action: PayloadAction<NewMessage>) => {
      const chatLog = action.payload;
      const roomIdx = state.list.findIndex(
        (room) => room.targetPk === chatLog.userPk,
      );

      state.newMessage = { ...chatLog, roomIdx };

      if (state.alarmCount <= 0) {
        state.alarmCount = 1;
      } else {
        state.alarmCount += 1;
      }

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

      const {
        chatRoomList,
        alarmCount,
      }: { chatRoomList: ShowChatInfo[]; alarmCount: number } =
        action.payload.reduce(
          (acc, cur): { chatRoomList: ShowChatInfo[]; alarmCount: number } => {
            const unchecked = parseInt(cur.unchecked, 10);
            const chatRoom = cur.lastChat[0]
              ? { ...cur, lastChat: [JSON.parse(cur.lastChat[0])], unchecked }
              : {
                  ...cur,
                  lastChat: [],
                  unchecked,
                };

            return {
              chatRoomList: [...acc.chatRoomList, chatRoom],
              alarmCount: acc.alarmCount + unchecked,
            };
          },
          { chatRoomList: [], alarmCount: 0 },
        );

      state.list = chatRoomList.sort((a, b) => {
        if (!(a.lastChat[0] && b.lastChat[0])) return 1;

        const aLastChat = a.lastChat[0];
        const bLastChat = b.lastChat[0];

        return bLastChat.curTime - aLastChat.curTime;
      });

      state.alarmCount = alarmCount;
    },
  },
});

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

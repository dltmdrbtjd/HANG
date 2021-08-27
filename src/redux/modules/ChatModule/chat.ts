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
};

const fetchGetChatRoomList = createAsyncThunk(
  'chat/GET_CHAT_ROOM',
  async () => {
    try {
      const { data } = await apis.GetChatRoom();
      const payload = data.result;
      console.log(data);

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
    ChatAlarmCheck: (state, action: PayloadAction<number>) => {
      state.alarmCount = action.payload;
    },

    CreateChatRoom: (state, action) => {
      state.list.unshift(action.payload);
      state.alarmCount += 1;
    },

    ChatHistoryUpdate: (state, action: PayloadAction<NewMessage>) => {
      const chatLog = action.payload;
      const roomIdx = state.list.findIndex(
        (room) => room.targetPk === chatLog.userPk,
      );

      if (roomIdx !== -1) {
        const { unchecked } = state.list[roomIdx];
        const updateRoom = {
          ...state.list[roomIdx],
          unchecked: unchecked + 1,
          lastChat: [
            {
              message: chatLog.message,
              curTime: chatLog.time,
            },
          ],
        };

        state.list.splice(roomIdx, 1);
        state.list.unshift(updateRoom);

        state.alarmCount += 1;
      }
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

export const getUserPkList = createSelector(
  (state: RootState) => state.chat.list,
  (chatInfoList) => {
    const userPkList = chatInfoList.map((chatInfo) => chatInfo.targetPk);

    return userPkList;
  },
);

export const getUnchecked = (targetPk: number) =>
  createSelector(
    (state: RootState) => state.chat.list,
    (chatInfoList: ReadChatInfo[]) => {
      const [userPkList] = chatInfoList.filter(
        (chatInfo: ReadChatInfo) => chatInfo.targetPk === targetPk,
      );

      return userPkList ? userPkList.unchecked : null;
    },
  );

export const ChatCreators = {
  fetchGetChatRoomList,
};
const { reducer, actions } = chatSlice;
export const { ChatAlarmCheck, CreateChatRoom, ChatHistoryUpdate } = actions;
export default reducer;

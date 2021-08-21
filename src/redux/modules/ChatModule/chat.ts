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
import { TargetUserInfo, NewMessage, ChatState } from './type';

export const initialState: ChatState = {
  alarmCount: 0,
  list: [],
  targetUserInfo: {
    nickname: '',
    profileImg: null,
    targetPk: 0,
  },
  loading: false,
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
    ChatAlarmCheck: (state, action: PayloadAction<number>) => {
      state.alarmCount = action.payload;
    },

    CreateChatRoom: (state, action) => {
      state.list.unshift(action.payload);
      state.alarmCount += 1;
    },

    ChooseChatRoom: (state, action: PayloadAction<TargetUserInfo>) => {
      state.targetUserInfo = action.payload;
    },

    DeleteChatRoom: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (room) => room.targetPk !== action.payload,
      );
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
          unchecked: String(parseInt(unchecked, 10) + 1),
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
      action: PayloadAction<any[]>,
    ) => {
      state.list = action.payload.sort((a, b) => {
        if (!(a.lastChat[0] && b.lastChat[0])) return -1;

        const aLastChat = JSON.parse(a.lastChat[0]);
        const bLastChat = JSON.parse(b.lastChat[0]);

        return bLastChat.curTime - aLastChat.curTime;
      });

      state.alarmCount = state.list.reduce(
        (acc, cur) => acc + parseInt(cur.unchecked, 10),
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

export const getUnchecked = createSelector(
  (state: RootState) => state.chat.list,
  (state: RootState) => state.chat.targetUserInfo,
  (chatInfoList, targetUserInfo) => {
    const [userPkList] = chatInfoList.filter(
      (chatInfo) => chatInfo.targetPk === targetUserInfo.targetPk,
    );

    return userPkList ? parseInt(userPkList.unchecked, 10) : null;
  },
);

export const ChatCreators = {
  fetchGetChatRoomList,
};
const { reducer, actions } = chatSlice;
export const {
  ChatAlarmCheck,
  CreateChatRoom,
  ChooseChatRoom,
  DeleteChatRoom,
  ChatHistoryUpdate,
} = actions;
export default reducer;

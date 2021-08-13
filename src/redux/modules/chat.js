import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';

const CHAT_ALARM_CHECK = 'chat/CHAT_ALARM_CHECK';
const GET_CHAT_ROOM = 'chat/GET_CHAT_ROOM';
const CREATE_CHAT_ROOM = 'chat/CREATE_CHAT_ROOM';
const CHOOSE_CHAT_ROOM = 'chat/CHOOSE_CHAT_ROOM';
const DELETE_CHAT_ROOM = 'chat/DELETE_CHAT_ROOM';
const CHAT_HISTORY_UPDATE = 'chat/CHAT_HISTORY_UPDATE';

const ChatAlarmCheck = createAction(CHAT_ALARM_CHECK, alarmCount => ({
  alarmCount,
}));
const ChatRoomLoad = createAction(GET_CHAT_ROOM, list => ({ list }));
const CreateChatRoom = createAction(CREATE_CHAT_ROOM, room => ({ room }));
const ChooseChatRoom = createAction(CHOOSE_CHAT_ROOM, targetUserInfo => ({
  targetUserInfo,
}));
const DeleteChatRoom = createAction(DELETE_CHAT_ROOM, targetUserPk => ({
  targetUserPk,
}));
const ChatHistoryUpdate = createAction(CHAT_HISTORY_UPDATE, chatLog => ({
  chatLog,
}));

const initialState = {
  alarmCount: 0,
  list: [],
  targetUserInfo: {},
};

const ChatRoomLoadDB = () => {
  return dispatch => {
    apis
      .GetChatRoom()
      .then(res => {
        dispatch(ChatRoomLoad(res.data.result));
      })
      .catch(err => console.log(err));
  };
};

export default handleActions(
  {
    [CHAT_ALARM_CHECK]: (state, action) =>
      produce(state, draft => {
        draft.alarmCount = action.payload.alarmCount;
      }),

    [GET_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list.sort((a, b) => {
          if (!(a.lastChat[0] && b.lastChat[0])) return -1;

          const aLastChat = JSON.parse(a.lastChat[0]);
          const bLastChat = JSON.parse(b.lastChat[0]);

          return bLastChat.curTime - aLastChat.curTime;
        });

        draft.alarmCount = draft.list.reduce(
          (acc, cur) => acc + parseInt(cur.unchecked, 10),
          0,
        );
      }),

    [CREATE_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.list.unshift(action.payload.room);
        draft.alarmCount += 1;
      }),

    [CHOOSE_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.targetUserInfo = action.payload.targetUserInfo;
      }),

    [DELETE_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.list = draft.list.filter(
          room => room.targetPk !== action.payload.targetUserPk,
        );
      }),

    [CHAT_HISTORY_UPDATE]: (state, action) =>
      produce(state, draft => {
        const chatLog = action.payload.chatLog;
        const roomIdx = draft.list.findIndex(
          room => room.targetPk === chatLog.userPk,
        );

        if (roomIdx !== -1) {
          const updateRoom = {
            ...draft.list[roomIdx],
            unchecked: parseInt(draft.list[roomIdx].unchecked, 10) + 1,
            lastChat: [
              {
                message: chatLog.message,
                curTime: chatLog.time,
              },
            ],
          };

          draft.list.splice(roomIdx, 1);
          draft.list.unshift(updateRoom);

          draft.alarmCount += 1;
        }
      }),
  },
  initialState,
);

const ChatCreators = {
  ChatAlarmCheck,
  ChatRoomLoadDB,
  CreateChatRoom,
  ChooseChatRoom,
  DeleteChatRoom,
  ChatHistoryUpdate,
};

export { ChatCreators };

import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';

const GET_CHAT_ROOM = 'chat/GET_CHAT_ROOM';
const CHOOSE_CHAT_ROOM = 'chat/CHOOSE_CHAT_ROOM';

const ChatRoomLoad = createAction(GET_CHAT_ROOM, list => ({ list }));
const ChooseChatRoom = createAction(CHOOSE_CHAT_ROOM, targetUserInfo => ({
  targetUserInfo,
}));

const initialState = {
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
    [GET_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),

    [CHOOSE_CHAT_ROOM]: (state, action) =>
      produce(state, draft => {
        draft.targetUserInfo = action.payload.targetUserInfo;
      }),
  },
  initialState,
);

const ChatCreators = {
  ChatRoomLoadDB,
  ChooseChatRoom,
};

export { ChatCreators };

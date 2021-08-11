import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// api
import apis from '../../shared/api';

const GET_CHAT_ROOM = 'chat/GET_CHAT_ROOM';

const ChatRoomLoad = createAction(GET_CHAT_ROOM, list => ({ list }));

const initialState = {
  list: [],
};

const ChatRoomLoadDB = () => {
  return dispatch => {
    apis
      .GetChatRoom()
      .then(res => {
        dispatch(ChatRoomLoad(res.data));
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
  },
  initialState,
);

const ChatCreators = {
  ChatRoomLoadDB,
};

export { ChatCreators };

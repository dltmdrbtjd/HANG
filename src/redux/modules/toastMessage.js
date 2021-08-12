import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const MESSAGE = 'toast/MESSAGE';

const initialState = {
  Message: false,
};

const Message = createAction(MESSAGE, msg => ({ msg }));
export default handleActions(
  {
    [MESSAGE]: (state, action) =>
      produce(state, draft => {
        draft.Message = action.payload.msg;
      }),
  },
  initialState,
);

const ToastCreators = {
  Message,
};

export { ToastCreators };

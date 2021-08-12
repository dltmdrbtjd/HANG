import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// api
import apis from '../../shared/api';

const LOAD = 'alarm/LOAD';
const DELETE = 'alarm/DELETE';

const initialState = {
  list: [],
};

const AlarmLoad = createAction(LOAD, list => ({ list }));
const AlarmDelete = createAction(DELETE);

const AlarmLoadDB = () => {
  return dispatch => {
    apis
      .AlarmLoad()
      .then(res => {
        dispatch(AlarmLoad(res.data.alarms));
      })
      .catch(err => console.log(err));
  };
};

const AlarmDeleteDB = () => {
  return dispatch => {
    apis
      .AlarmDelete()
      .then(res => {
        dispatch(AlarmDelete());
      })
      .catch(err => console.log(err));
  };
};

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, draft => {
        draft.list = action.payload.list;
      }),
    [DELETE]: (state, action) =>
      produce(state, draft => {
        draft.list = [];
      }),
  },
  initialState,
);

const AlarmCreators = {
  AlarmLoadDB,
  AlarmDeleteDB,
};

export { AlarmCreators };

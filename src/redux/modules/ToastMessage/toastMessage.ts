import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// types
import { messageState } from './type';

const initialState: messageState = {
  Message: false,
  text:'',
}

const toastMessageSlice = createSlice({
  name: 'toastMessage',
  initialState,
  reducers:{
    fetchMessage: (state,action: PayloadAction<messageState>) => {
      state.Message = action.payload.Message;
      state.text = action.payload.text;
    },
  },
});

const { reducer, actions } = toastMessageSlice;
export const { fetchMessage } = actions;
export default reducer;

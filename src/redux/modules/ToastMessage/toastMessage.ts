import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// types
import { messageState } from './type';

const initialState: messageState = {
  Message: false,
  error: '',
}

const toastMessageSlice = createSlice({
  name:'toastMessage',
  initialState,
  reducers:{
    fetchMessage: (state,action: PayloadAction<messageState>) => {
      state.Message = action.payload.Message;
      state.error = action.payload.error;
    },
  },
});

const { reducer, actions } = toastMessageSlice;
export const { fetchMessage } = actions;
export default reducer;
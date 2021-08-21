import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// types
import { messageState } from './type';

const initialState: messageState = {
  Message: false,
}

const toastMessageSlice = createSlice({
  name:'toastMessage',
  initialState,
  reducers:{
    fetchMessage: (state,action: PayloadAction<boolean>) => {
      state.Message = action.payload;
      setTimeout(() => {
        state.Message = false
      }, 1500);
    },
  },
});

const { reducer, actions } = toastMessageSlice;
export const { fetchMessage } = actions;
export default reducer;
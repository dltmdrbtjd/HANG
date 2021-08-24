import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// type
import { AlertState } from './type';

const initialState: AlertState = {
  status: false,
  errorMsg: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    activeAlert: (state, action: PayloadAction<AlertState>) => {
      state.status = action.payload.status;
      state.errorMsg = action.payload.errorMsg;
    },
    disableAlert: (state) => {
      state.status = false;
      state.errorMsg = '';
    },
  },
});

const { reducer, actions } = alertSlice;
export const { activeAlert, disableAlert } = actions;
export default reducer;

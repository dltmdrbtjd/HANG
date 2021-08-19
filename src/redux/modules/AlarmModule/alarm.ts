import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// apis
import apis from 'src/shared/api';
// types
import { alarmState } from './type';

const initialState: alarmState = {
  list: [],
  loading: false,
}

const fetchAlarmLoad = createAsyncThunk('alarm/LOAD', async () => {
  try {
    const { data } = await apis.AlarmLoad();
    return data.alarms;
  } catch (err) {
    console.log(err);
    return false;
  }
});

const fetchDeleteAlarm = createAsyncThunk('alarm/DELETE', async ():Promise<any> => {
  try {
    return await apis.AlarmDelete();
  } catch (err) {
    return console.log(err);
  }
});

const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers:{},
  extraReducers:{
    [fetchAlarmLoad.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchAlarmLoad.fulfilled.type]: (state, action: PayloadAction<[]>) => {
      state.list = action.payload;
      state.loading = false;
    },
    [fetchAlarmLoad.rejected.type]: (state) => {
      state.list = initialState.list;
      state.loading = false;
    },
    [fetchDeleteAlarm.fulfilled.type]: (state) => {
      state.list = [];
    }
  }
})


const AlarmCreators = {
  fetchAlarmLoad,
  fetchDeleteAlarm,
}

export { AlarmCreators }

const { reducer } = alarmSlice;
export default reducer;
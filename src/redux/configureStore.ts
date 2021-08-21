import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { connectRouter } from 'connected-react-router';
// modules
import HomeReducer from './modules/HomeModule/home';
import FavoriteReducer from './modules/FavoriteModule/favorite';
import SearchReducer from './modules/SearchModule/search';
import DetailReducer from './modules/DetailModule/detail';
import ToastReducer from './modules/ToastMessage/toastMessage';
import AlarmReducer from './modules/AlarmModule/alarm';
import MyPageReducer from './modules/MyPageModule/mypage';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  home: HomeReducer,
  favorite: FavoriteReducer,
  search: SearchReducer,
  toastMessage: ToastReducer,
  detail: DetailReducer,
  alarm: AlarmReducer,
  mypage: MyPageReducer,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history })];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

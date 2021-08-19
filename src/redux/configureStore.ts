import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { connectRouter } from 'connected-react-router';
// modules
import HomeReducer from './modules/HomeModule/home';
import FavoriteReducer from './modules/FavoriteModule/favorite';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  home: HomeReducer,
  favorite: FavoriteReducer,
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
export default store;

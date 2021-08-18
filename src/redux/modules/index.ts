import { combineReducers } from 'redux';

// 라우팅
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

// modules
import home from './home';

export const history = createBrowserHistory();

// root reducer
const rootReducer = combineReducers({
  home,
  router: connectRouter(history),
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
import React from 'react';
import ReactDOM from 'react-dom';
// router
import { BrowserRouter } from 'react-router-dom';
// serviceWorker
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorkerRegistration';
// redux store
// theme
import GlobalThemeProvider from './styles/GlobalThemeProvider';

import store from './redux/configureStore';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <GlobalThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();

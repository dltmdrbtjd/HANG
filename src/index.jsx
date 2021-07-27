import React from 'react';
import ReactDOM from 'react-dom';
// redux store
import { Provider } from 'react-redux';
// theme
import GlobalThemeProvider from './styles/GlobalThemeProvider';

import store from './redux/configureStore';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <GlobalThemeProvider>
      <App />
    </GlobalThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

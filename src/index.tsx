import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// theme
import GlobalThemeProvider from './styles/GlobalThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <App />
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
reportWebVitals();

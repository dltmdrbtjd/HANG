import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalThemeProvider } from './styles/GlobalThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <App />
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

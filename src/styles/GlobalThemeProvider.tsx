import React, { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import GlobalStyle from './GlobalStyle';

interface Prop {
  children?: ReactElement | ReactElement[] | string;
}

const GlobalThemeProvider = ({ children }: Prop) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

GlobalThemeProvider.defaultProps = { children: null };

export default GlobalThemeProvider;

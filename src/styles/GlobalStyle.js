import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    color: ${({ theme }) => theme.color.black};
  }
  
  ${reset};
  body {
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    background-color: ${({ theme }) => theme.color.bgColor};
    line-height: 1.5;
  }

  button, input {
    -moz-appearance: none; /* Firefox */
    -webkit-appearance: none; /* Safari and Chrome */
    appearance: none;
  }
  menu, ol, ul {
    list-style: none;
  }
  a:link {
    color: black; 
    text-decoration: none;
  }
  a:visited {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: none;
  }
  a:active {
    color: black;
  }
`;

export default GlobalStyle;

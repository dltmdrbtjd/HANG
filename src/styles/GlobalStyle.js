import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  ${reset};
  body {
    overflow: hidden;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.5;
    @media only screen and (min-width : 768px){
      font-size: 14px;
    }
    @media only screen and (min-width : 1024px){
      font-size:16px;
    }
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

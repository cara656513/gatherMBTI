import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  a{

    text-decoration-line: none;
    color: black
  }
  
    
  @font-face {
    font-family: 'KBO-Dia-Gothic_light';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  
  }

  body {font-family: 'KBO-Dia-Gothic_light';}


`;

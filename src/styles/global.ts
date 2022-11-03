import { createGlobalStyle } from 'styled-components';
import Normalize from './normalize';
import AntStyled from './antStyled';

const GlobalStyle = createGlobalStyle`
  ${Normalize}
  ${AntStyled}
`;

export default GlobalStyle;

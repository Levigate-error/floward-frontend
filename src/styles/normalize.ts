import { css } from 'styled-components';

const Normalize = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${(props) => props.theme.colors.gray0};
  }

  svg {
    outline: none;
  }

  a {
    outline: none;
    text-decoration: none;
    color: black;
  }

  button, a {
    cursor: pointer;
  }

  button {
    background: none;
    border: none;

    &:focus {
      outline: none;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  input, textarea {
    border: none;
    outline: none;
    border-radius: 0;
    resize: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.placeholderColor} !important;
    }
  }
`;

export default Normalize;

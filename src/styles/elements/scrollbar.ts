import { css } from 'styled-components';

const Scrollbar = css`
  scrollbar-face-color: #dcf8fb;
  scrollbar-track-color: #dfdfdf;
  scrollbar-width: thin;
  scrollbar-color: #dfdfdf #dcf8fb;

  &::-webkit-scrollbar {
    background: #dcf8fb;
    width: 7px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #dfdfdf;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
`;

export default Scrollbar;

import { css } from 'styled-components';

const Container = css`
  width: 100%;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 60px;

  @media (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default Container;

import { css } from 'styled-components';

const PageContainer = css`
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 140px;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 1100px) {
    padding-left: 110px;
  }

  @media (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
  }
`;

export default PageContainer;

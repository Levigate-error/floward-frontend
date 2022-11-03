import styled, { css } from 'styled-components';

const PageCss = css`
  padding-top: 60px;
  padding-bottom: 60px;
  width: 100%;
  position: relative;

  @media (max-width: 600px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const Page = styled.main`
  ${PageCss}
`;

export {
  PageCss,
  Page,
};

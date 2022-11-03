import React, { FC } from 'react';
import Header from 'components/Header';
import Styled from './styled';

const Authed: FC = ({ children }) => (
  <Styled.Wrapper>
    <Header />
    <Styled.Container>
      {children}
    </Styled.Container>
  </Styled.Wrapper>
);

export default Authed;

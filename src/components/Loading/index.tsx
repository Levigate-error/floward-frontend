import React, { FC } from 'react';
import ReactLoading from 'react-loading';
import Styled from './styled';

const Loading: FC = () => (
  <Styled.Loading>
    <ReactLoading type="bars" color="#0DC4E0" height={100} width={100} />
  </Styled.Loading>
);

export default Loading;

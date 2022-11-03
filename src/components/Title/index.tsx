import React, { FC } from 'react';
import Styled from './styled';
import { TitleProps } from './types';

const Title: FC<TitleProps> = ({
  useHAs = 'h1', title, children, className,
}) => (
  <Styled.Wrapper as={useHAs} className={className}>
    {children || title}
  </Styled.Wrapper>
);

export default Title;

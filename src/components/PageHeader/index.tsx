import React, { FC } from 'react';
import Styled from './styled';
import { PageHeaderProps } from './types';

type StyledComponents = {
  Right: typeof Styled.Right
}

const PageHeader: FC<PageHeaderProps> & StyledComponents = ({
  title, description, double, children,
}) => (
  <Styled.Wrapper double={double}>
    <Styled.TextWrapper>
      {title && <Styled.Title withDescription={!!description}>{title}</Styled.Title>}
      {description && <Styled.Description>{description}</Styled.Description>}
    </Styled.TextWrapper>
    {children}
  </Styled.Wrapper>
);

PageHeader.Right = Styled.Right;

export default PageHeader;

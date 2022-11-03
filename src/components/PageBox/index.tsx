import React, { FC } from 'react';
import Title from 'components/Title';
import { PageBoxProps } from './types';
import Styled from './styled';

type StyledComponents = {
  Left: typeof Styled.Left
  Right: typeof Styled.Right
}

const PageBox: FC<PageBoxProps> & StyledComponents = ({
  className, title, double, children, preContent, postContent,
}) => (
  <Styled.Wrapper double={double} className={className}>
    {title && (
    <Title>
      {title}
    </Title>
    )}
    {preContent}
    <Styled.Content>
      {children}
    </Styled.Content>
    {postContent}
  </Styled.Wrapper>
);

PageBox.Left = Styled.Left;
PageBox.Right = Styled.Right;

export default PageBox;

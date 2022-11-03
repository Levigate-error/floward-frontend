import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps } from './types';
import Styled, { WrapperProps } from './styled';

const Button: FC<ButtonProps> = ({
  className, disabled, type = 'button', styleType, fw, even, onClick, href, children, blinking, style,
}) => {
  const wrapperProps = useMemo<WrapperProps>(() => {
    if (!href) {
      return {
        as: 'button',
        onClick,
        type,
      };
    }
    if (href.startsWith('http://') || href.startsWith('https://')) {
      return {
        as: 'a',
        target: '_blank',
        href,
      };
    }
    return {
      as: Link,
      to: href,
    };
  }, [type, href, onClick]);

  return (
    <Styled.Wrapper
      {...wrapperProps}
      {...(styleType ? { styleType } : {})}
      fw={fw}
      style={style}
      className={className}
      blinking={blinking}
      even={even}
      disabled={disabled}
    >
      <Styled.Content>
        {children}
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default Button;

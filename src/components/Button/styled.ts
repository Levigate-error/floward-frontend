import styled, { css } from 'styled-components';
import { ButtonProps } from './types';

export interface WrapperProps extends ButtonProps {
  as?: any
  target?: '_blank'
  blinking?: boolean
}

const Wrapper = styled.button<WrapperProps>`
  padding: ${(props) => (props.even ? '16px' : '16px 32px')};
  font-size: 16px;
  font-weight: 700;
  line-height: 100%;
  position: relative;
  color: ${(props) => props.theme.colors.dark};
  border: 1px solid ${(props) => props.theme.colors.gray3};
  transition: color .3s ease;
  display: inline-block;
  border-radius: 100px;
  overflow: hidden;
  ${(props) => (props.fw ? 'width: 100%' : '')};

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background-color: ${(props) => props.theme.colors.turquoiseDark};
    transition: width .3s;
  }

  svg {
    position: relative;
    z-index: 1;

    path {
      fill: ${(props) => props.theme.colors.dark};
      transition: fill .3s ease;
    }
  }

  &:hover {
    color: #fff;

    &:after {
      width: 100%;
    }

    svg {
      path {
        fill: #fff;
      }
    }
  }
  
  ${(props) => props.blinking && css`
    animation: gButtonBlink 2s infinite;

    span {
      animation: gButtonBlinkSpan 2s infinite;
    }

    svg {
      path {
        animation: gButtonBlinkSvgPath 2s infinite;
      }
    }

    @keyframes gButtonBlink {
      50% {
        border-color: ${props.theme.colors.turquoiseDark};
        background: ${props.theme.colors.turquoiseDark};
      }
    }

    @keyframes gButtonBlinkSpan {
      50% {
        color: white;
      }
    }

    @keyframes gButtonBlinkSvgPath {
      50% {
        fill: #fff;
      }
    }
  `}

  &:disabled {
    cursor: not-allowed;
    background: ${(props) => props.theme.colors.gray1};
    color: #fff;

    &:after {
      display: none;
    }

    &:hover {
      color: #fff;
    }
  }
  
  ${(props) => props.styleType === 'primary' && css`
    border-color: ${props.theme.colors.turquoiseDark};
    background: ${props.theme.colors.turquoiseDark};
    color: #fff;

    &:after {
      background: #fff;
    }

    &:hover {
      color: ${props.theme.colors.dark};

      svg {
        path {
          fill: ${props.theme.colors.dark};
        }
      }
    }
  `}
  
  ${(props) => props.styleType === 'danger' && css`
    &:after {
      background: ${props.theme.colors.red};
    }

    &:hover {
      color: #fff;
    }
  `}
`;

const Content = styled.span`
  position: relative;
  z-index: 1;
`;

export default {
  Wrapper,
  Content,
};

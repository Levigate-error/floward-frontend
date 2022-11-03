import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import textClamped from 'styles/elements/textClamped';
import { default as TextAreaAntD } from 'antd/es/input/TextArea';

interface WrapperProps {
  focused: boolean
  disabled: boolean
}

interface PlaceholderProps {
  active: boolean
}

interface InputProps {
  isPassword: boolean
}

const Wrapper = styled.div<WrapperProps>`
  position: relative;

  ${(props) => (props.disabled ? css`
    opacity: 0.5;
    
    ${Input} {
      background: #f5f5f5;
      border: 1px solid #d9d9d9;
    }
    
    ${Placeholder} {
      background: 0 0;
    }
  ` : null)}
`;

const Placeholder = styled.span<PlaceholderProps>`
  position: absolute;
  top: 17px;
  left: 10px;
  max-width: calc(100% - 20px);
  padding: 0 10px;
  background: #fff;
  border-radius: 50px;
  font-size: 16px;
  line-height: 100%;
  z-index: 1;
  color: ${(props) => props.theme.colors.placeholderColor};
  transition: top .3s ease, transform .3s ease, background-color .3s ease;
  ${textClamped(1)};
  pointer-events: none;
  
  ${(props) => (props.active ? css`
    color: ${props.theme.colors.dark};
    transform: translateY(calc(-50% - 17px));
    pointer-events: auto;
  ` : null)};
`;

const inputAreaCss = css`
  width: 100%;
  font-size: 16px;
  line-height: 120%;
  border: 1px solid ${(props) => props.theme.colors.gray3};
  color: ${(props) => props.theme.colors.dark};
  border-radius: 4px;
  background: #fff;
  padding: 14px 20px;
  transition: border-color .3s ease, opacity .3s ease;

  &:focus {
    border-color: ${(props) => props.theme.colors.dark};
  }
`;

const Input = styled.input<InputProps>`
  ${inputAreaCss};
  
  ${(props) => (props.isPassword ? 'padding-right: 45px' : null)};
`;

const Textarea = styled(TextAreaAntD)`
  ${inputAreaCss};
  z-index: 0;
`;

const PasswordEye = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  z-index: 1;
  transform: translateY(-50%);
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const PasswordEyeIcon = styled(FontAwesomeIcon)`
  width: 100%;
  height: 100%;
`;

const ErrorMessage = styled.p`
  color: #f61c1c;
  margin-top: 8px;
`;

export default {
  Wrapper,
  Placeholder,
  Input,
  Textarea,
  PasswordEye,
  PasswordEyeIcon,
  ErrorMessage,
};

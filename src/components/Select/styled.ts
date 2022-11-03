import styled, { css } from 'styled-components';
import { Select as SelectNotStyled } from 'antd';
import textClamped from 'styles/elements/textClamped';

const { Option: OptionNotStyled } = SelectNotStyled;

interface WrapperProps {
  active: boolean
}

const Label = styled.span`
  z-index: 2;
  position: absolute;
  top: 17px;
  left: 10px;
  max-width: calc(100% - 40px);
  padding: 0 10px;
  background: #fff;
  border-radius: 50px;
  font-size: 16px;
  line-height: 100%;
  pointer-events: none;
  color: ${(props) => props.theme.colors.placeholderColor};
  transition: top .3s ease, transform .3s ease, background-color .3s ease;
  ${textClamped(1)};
`;

const Wrapper = styled.div<WrapperProps>`
  width: 100%;
  position: relative;
  
  .ant-select {
    &-selector {
      min-height: 49.2px;
    }
    
    &-selection {
      &-item {
        height: fit-content;
        margin: auto 0;
      }
    }
  }
  
  ${(props) => (props.active ? css`
    ${Label} {
      color: ${props.theme.colors.dark};
      transform: translateY(calc(-50% - 17px));
      pointer-events: auto;
      max-width: calc(100% - 20px);
    }
  ` : null)}
`;

const Select = styled(SelectNotStyled)`
  width: 100%;
`;

const Option = styled(OptionNotStyled)``;

export default {
  Wrapper,
  Label,
  Select,
  Option,
};

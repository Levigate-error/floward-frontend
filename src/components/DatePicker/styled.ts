import styled from 'styled-components';
import { DatePicker as DatePickerNotStyled } from 'antd';

interface WrapperProps {
  active: boolean
}

const Label = styled.span`
  z-index: 2;
  position: absolute;
  top: 17px;
  left: 10px;
  max-width: calc(100% - 20px);
  padding: 0 10px;
  background: #fff;
  border-radius: 50px;
  font-size: 16px;
  line-height: 100%;
  pointer-events: none;
  color: ${(props) => props.theme.colors.placeholderColor};
  transition: top .3s ease, transform .3s ease, background-color .3s ease;
`;

const Wrapper = styled.div<WrapperProps>`
  position: relative;
  width: 100%;

  ${(props) => (props.active ? `
    ${Label} {
      color: ${props.theme.colors.dark};
      transform: translateY(calc(-50% - 17px));
    }
  ` : null)}
`;

const DatePicker = styled(DatePickerNotStyled)`
  width: 100%;
  min-height: 49.2px;
`;

export default {
  Wrapper,
  Label,
  DatePicker,
};

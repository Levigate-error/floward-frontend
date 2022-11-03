import styled from 'styled-components';
import { default as PageBoxNotStyled } from 'components/PageBox';
import { default as ButtonNotStyled } from 'components/Button';
import { Checkbox as NotStyledCheckbox } from 'antd';
import InputStyled from 'components/Input/styled';
import TitleStyled from 'components/Title/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  position: fixed;
  top: 30px;
  left: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
`;

const PageBox = styled(PageBoxNotStyled)`
  max-width: 320px;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
  overflow: hidden;
  
  ${TitleStyled.Wrapper} {
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  ${InputStyled.Wrapper} {
    margin-bottom: 20px;
  }
`;

const Button = styled(ButtonNotStyled)`
  width: 100%;
  margin-top: 10px;
  span {
    text-transform: uppercase;
  }
`;

const Checkbox = styled(NotStyledCheckbox)`
  .ant-checkbox {
    margin-right: 10px;
  }
`;

export default {
  Wrapper,
  Header,
  PageBox,
  Form,
  Button,
  Checkbox,
};

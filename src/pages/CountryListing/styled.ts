import styled from 'styled-components';
import { default as NotStyledEyeIcon } from 'icons/eye.svg';
import { Link as LinkNotStyled } from 'react-router-dom';

const EyeIcon = styled(NotStyledEyeIcon)`
  width: 30px;
  height: 30px;
`;

const Link = styled(LinkNotStyled)``;

const PopupWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
`;

const PopupBg = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const PopupBody = styled.div`
  width: 30%;
  height: 40%;
  border-radius: 30px;
  background-color: #fff;
  padding: 20px;
  z-index: 3;
`;

const PopupButton = styled.button`
  cursor: pointer;
  color: #3232dc;
`;

const PopupText = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

export default {
  PopupWrapper,
  PopupBody,
  PopupBg,
  PopupButton,
  PopupText,
  EyeIcon,
  Link,
};

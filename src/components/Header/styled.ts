import styled, { css } from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import scrollbar from 'styles/elements/scrollbar';
import Button from 'components/Button';
import TextClamped from 'styles/elements/textClamped';

interface WrapperProps {
  collapsed: boolean
}

interface NavListItemContentProps {
  active?: boolean
}

interface NavListItemStatusProps {
  danger?: string | boolean
}

const activeSidebarLink = css`
  color: ${(props) => props.theme.colors.turquoiseDark2};
  background: ${(props) => props.theme.colors.turquoise};

  svg {
    * {
      fill: ${(props) => props.theme.colors.turquoiseDark2};
    }
  }
`;

const Logo = styled(Link)`
  width: 100%;
  padding: 40px 20px;
  display: block;
`;

const Nav = styled.nav`
  ${scrollbar};
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  min-height: 0;
`;

const NavList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavListItem = styled.li`
  position: relative;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const NavListItemIcon = styled(FontAwesomeIcon)`
  width: 20px !important;
  height: auto;
  margin-right: 10px;

  * {
    fill: ${(props) => props.theme.colors.gray1};
    transition: fill .3s ease;
  }
`;

const NavListItemContent = styled(NavLink)<NavListItemContentProps>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  font-size: 16px;
  line-height: 120%;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray1};
  transition: background .3s ease, color .3s ease;
  border-radius: 16px;

  @media (hover: hover) {
    &:hover {
      ${activeSidebarLink}
    }
  }

  &.active {
    ${activeSidebarLink}
  }
  
  ${(props) => props.active && css`
    ${activeSidebarLink}
  `}
`;

const NavListItemLabel = styled.span``;

const NavListItemStatus = styled(FontAwesomeIcon)<NavListItemStatusProps>`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 0;
  right: 0;
  
  path {
    fill: ${(props) => (props.danger ? props.theme.colors.red : props.theme.colors.green)};
  }
`;

const NavListItemDropdown = styled.ul`
  margin-left: 30px;
  padding-left: 20px;
  border-left: 1px solid ${(props) => props.theme.colors.turquoiseDark2};
`;

const Collapser = styled.button`
  margin: auto 10px 30px auto;
  width: 40px;
  height: 40px;
  display: none;
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) and (min-width: 601px) {
    display: flex;
  }
`;

const CollapserIcon = styled(FontAwesomeIcon)`
  transform: rotate(180deg);
  transition: transform .3s ease;
  
  path {
    fill: ${(props) => props.theme.colors.turquoiseDark}
  }
`;

const UserArea = styled.div`
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  
  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const UserEmail = styled.span`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  ${TextClamped(1)}
`;

const UserSignout = styled(Button)`
  width: 100%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 0;
  width: 100%;
`;

const Wrapper = styled.header<WrapperProps>`
  max-height: 120px;
  min-height: 120px;
  width: 100vw;
  filter: drop-shadow(0 0 24px rgba(0, 111, 128, 0.12));
  border-radius: 0 0 40px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background: #fff;
  display: flex;
  flex-direction: row;
`;

export default {
  Wrapper,
  Body,
  Logo,
  Nav,
  NavList,
  NavListItem,
  NavListItemIcon,
  NavListItemContent,
  NavListItemLabel,
  NavListItemStatus,
  NavListItemDropdown,
  NavListItemDropdownItem: NavListItem,
  Collapser,
  CollapserIcon,
  UserArea,
  UserEmail,
  UserSignout,
};

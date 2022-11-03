import React, {
  FC, useMemo, useState,
} from 'react';
import useResize from 'hooks/useResize';
import { matchPath, useLocation } from 'react-router-dom';
import { setUser } from 'store/auth';
import { useAppDispatch } from 'store';
import Styled from './styled';
import { SIDEBAR_NAV } from './consts';
import { SidebarNavItemCommonType, SidebarNavItemExpandableType } from './types';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [expandedNavItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const onResize = (): void => {
    setCollapsed(window.innerWidth <= 1100);
  };

  useResize(onResize);

  const activeExpandedNavItemTitle = useMemo<string>(() => {
    let activeExpandedNavItem = '';

    SIDEBAR_NAV.forEach((navItem) => {
      if ((navItem as SidebarNavItemExpandableType).children) {
        (navItem as SidebarNavItemExpandableType).children.forEach((childItem) => {
          if (matchPath(`${childItem.path}/*`, pathname)) {
            activeExpandedNavItem = navItem.title;
          }
        });
      }
    });

    return activeExpandedNavItem;
  }, [pathname]);

  const signOut = (): void => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
  };

  return (
    <Styled.Wrapper collapsed={collapsed}>
      <Styled.Body>
        <Styled.Nav>
          <Styled.NavList>
            {SIDEBAR_NAV.map((item) => (
              <Styled.NavListItem
                key={`${item.title}${
                  (item as SidebarNavItemCommonType).path ? `-${(item as SidebarNavItemCommonType).path}` : ''
                }`}
              >
                <Styled.NavListItemContent
                  {...((item as SidebarNavItemCommonType).path ? {
                    to: (item as SidebarNavItemCommonType).path,
                  } : {
                    as: 'button',
                    active: activeExpandedNavItemTitle === item.title,
                    onClick: () => {
                      setCollapsed(false);
                      setExpandedItems({
                        ...expandedNavItems,
                        [item.title]: expandedNavItems[item.title] === undefined || collapsed
                          ? true
                          : !expandedNavItems[item.title],
                      });
                    },
                  })}
                >
                  <Styled.NavListItemLabel>{item.title}</Styled.NavListItemLabel>
                </Styled.NavListItemContent>
                {(item as SidebarNavItemExpandableType).children && (
                  <Styled.NavListItemDropdown hidden={!expandedNavItems[item.title]}>
                    {(item as SidebarNavItemExpandableType).children.map((child) => (
                      <Styled.NavListItemDropdownItem
                        key={`${child.title}${
                          (child as SidebarNavItemCommonType).path ? `-${(child as SidebarNavItemCommonType).path}` : ''
                        }`}
                      >
                        <Styled.NavListItemContent to={child.path}>
                          <Styled.NavListItemLabel>{child.title}</Styled.NavListItemLabel>
                        </Styled.NavListItemContent>
                      </Styled.NavListItemDropdownItem>
                    ))}
                  </Styled.NavListItemDropdown>
                )}
              </Styled.NavListItem>
            ))}
          </Styled.NavList>
        </Styled.Nav>
        <Styled.UserArea>
          <Styled.UserSignout styleType="danger" onClick={signOut}>Logout</Styled.UserSignout>
        </Styled.UserArea>
      </Styled.Body>
    </Styled.Wrapper>
  );
};

export default Header;

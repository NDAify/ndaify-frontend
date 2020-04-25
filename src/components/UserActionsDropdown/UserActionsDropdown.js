
import React, { useCallback } from 'react';
import styled from 'styled-components';

import {
  Menu as ReachMenu,
  MenuList as ReachMenuList,
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
} from '@reach/menu-button';

import { Link, Router } from '../../routes';

import { API } from '../../api';

import ChevronDown from './images/chevron-down.svg';

const NavigationListItemButton = styled(ReachMenuButton)`
  display: block;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  padding-right: 10px;
  font-family: inherit;
  border: 1px solid #ffffff;
  border-left: 0px;
  text-decoration: none;
  background-color: transparent;
  color: #000000;
  cursor: pointer;
  transition: none;
  font-size: 20px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 40px;
          
  :focus {
    background: rgba(255, 255, 255, 0.1);
    outline: -webkit-focus-ring-color auto 0px;
    outline-offset: 0px;
  }

  :visited {
    color: #000000;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const MoreOptionsButton = styled(NavigationListItemButton)`
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {}
`;

const MoreOptionsMenuList = styled(ReachMenuList)`
  // FIXME(jmurzy) reach-ui does not provide a way to set className on the data-reach-menu element.
  // We should probably report this as a bug rather than polluting the global scope with magic
  body:not(&) {
    [data-reach-menu] {
      display: block;
      position: absolute;
      z-index: 1;
    }
  }

  display: block;
  white-space: nowrap;
  outline: none;
  padding: 12px 0;

  min-width: 200px;

  margin: 0;
  padding: 0;

  margin-top: 8px;
  border-radius: 4px;
  overflow: hidden;

  background-color: #FFFFFF;
  border: 1px solid #DEDCE0;
  box-shadow: 0 10px 20px 0 rgba(255,255,255,0.15);
  z-index: 10000;

  [data-reach-menu-item] {
    display: block;
    cursor: pointer;
    color: inherit;
    font-size: 16px;
    line-height: 24px;
    text-decoration: initial;
    padding: 6px 12px;
    text-align: center;
  }

  [data-reach-menu-item][data-selected] {
    background: #f5f5f5;
    color: #000000;
    outline: none;
  }
`;

const MenuLink = React.forwardRef(({ children, route, ...props }, ref) => (
  <Link route={route}>
    <a
      ref={ref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </a>
  </Link>
));

const UserActionsDropdown = () => {
  const handleLogOutClick = async () => {
    const api = new API();
    await api.endSession();

    Router.pushRoute('root');
  };
  const onLogOutClick = useCallback(handleLogOutClick, []);

  return (
    <ReachMenu isOpen>
      {(/* { isOpen } */) => (
        <>
          <MoreOptionsButton id="header-more-options">
            <ChevronDown aria-hidden />
          </MoreOptionsButton>
          <MoreOptionsMenuList>
            {
              // eslint-disable-next-line no-constant-condition
              false ? (
                <ReachMenuLink as={MenuLink} route="/">
                  Settings
                </ReachMenuLink>
              ) : null
            }
            <ReachMenuItem onSelect={onLogOutClick}>
              Log Out
            </ReachMenuItem>
          </MoreOptionsMenuList>
        </>
      )}
    </ReachMenu>
  );
};

export default UserActionsDropdown;

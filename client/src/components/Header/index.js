import React from 'react';
import UserOutlined from "@ant-design/icons/UserOutlined";
import './css/menu.scss';
import {useSelector} from "react-redux";

export const Header = () => {
  const { nickname } = useSelector(state => state.loggedUser);
  return (
      <div className="container-header">
          <div className="container-header-title">
              <a href="/conversations">
                <img src="/images/lbc-logo.webp" alt="Leboncoin logo"/>
              </a>
          </div>
          <div className="container-header-actions">
              <UserOutlined  style={{ fontSize: '1.5rem', margin: '0.625rem' }} />
              <span data-testid="userNickname">{nickname}</span>
          </div>
      </div>
  );
};

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../../contexts/AuthContext';
import style from './style.m.less';

export default () => (
    <AuthConsumer>
        {({ isAuth, login, logout }) => (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                className={style.mainMenu}
            >
                <Menu.Item key="hiking">
                    <Link to="/hiking">Походы</Link>
                </Menu.Item>
                <Menu.Item key="routes">
                    <Link to="/routes">Маршруты</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/recipes">Рецепты</Link>
                </Menu.Item>
                {
                    isAuth
                        ? <Menu.Item key="4" onClick={logout}>Выйти</Menu.Item>
                        : <Menu.Item key="4" onClick={login}>Войти</Menu.Item>
                }
            </Menu>
        )}
    </AuthConsumer>
);

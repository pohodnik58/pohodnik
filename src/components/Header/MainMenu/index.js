import React from 'react';
import { Menu } from 'antd';
import {AuthConsumer} from "../../../contexts/AuthContext";
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
                <Menu.Item key="1" href={'http://ya.ru'}>Походы</Menu.Item>
                <Menu.Item key="2">Маршруты</Menu.Item>
                <Menu.Item key="3">Рецепты</Menu.Item>
                {
                    isAuth
                    ? <Menu.Item key="4" onClick={logout}>Выйти</Menu.Item>
                    : <Menu.Item key="4" onClick={login}>Войти</Menu.Item>
                }
            </Menu>
        )}
    </AuthConsumer>
);

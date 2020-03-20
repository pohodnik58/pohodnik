import React from 'react';
import MainMenu from './MainMenu';
import Logo from './Logo';
import { Layout } from 'antd';
import style from './style.m.less'

const { Header } = Layout;

export default () => {
    return (
        <Header className={style.header}>
            <Logo />
            <MainMenu />
        </Header>
    );
};

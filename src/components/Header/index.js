import React from 'react';
import { Layout } from 'antd';
import MainMenu from './MainMenu';
import Logo from './Logo';
import style from './style.m.less';

const { Header } = Layout;

export default () => (
    <Header className={style.header}>
        <Logo />
        <MainMenu />
    </Header>
);

import React from 'react';
import { Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { AuthConsumer } from '../../../contexts/AuthContext';
import style from './style.m.less';
import UserMenu from './UserMenu';

export default () => {
    const history = useHistory();

    return (
        <AuthConsumer>
            {({ isAuth, isAuthLoading }) => (
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
                    { isAuthLoading && <LoadingOutlined /> }
                    { !isAuthLoading && (isAuth
                        ? <UserMenu key="4" />
                        : <Menu.Item key="4"><Link to={`/login?return=${history.location.pathname}`}>Войти</Link></Menu.Item>)}
                </Menu>
            )}
        </AuthConsumer>
    );
};

import React from 'react';
import { Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../../../../contexts/AuthContext';

const { SubMenu } = Menu;

export default function UserMenu(props) {
    return (
        <AuthConsumer>
            {({ user }) => (
                <SubMenu
                    title={(
                        <span className="submenu-title-wrapper">
                            <Avatar src={user.photo_50} size="small">
                                {user.surname.charAt(0) + user.name.charAt(0)}
                            </Avatar>
                            {user.name}
                        </span>
                    )}
                    {...props}
                >

                    <Menu.Item key="setting:1"><Link to="/Profile">Профиль</Link></Menu.Item>
                    <Menu.Divider />
                    <Menu.Item key="setting:3">
                        <Link to="/Logout">Выйти</Link>
                    </Menu.Item>

                </SubMenu>
            )}
        </AuthConsumer>
    );
}

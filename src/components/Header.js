import React from 'react';
import { Link, } from 'react-router-dom';
import { AuthConsumer, } from '../AuthContext';

const headerStyle = {
    display: 'flex',
    backgroundColor: '#26c6da',
    justifyContent: 'space-between',
    padding: 10,
};

const linkStyle = {
    color: 'white',
    textDecoration: 'underline',
};

export default () => (
    <header>
        <AuthConsumer>
            {({ isAuth, login, logout, }) => (
                <div style={headerStyle}>
                    <h3>
                        <Link style={linkStyle} to="/">
                            HOME
                        </Link>
                    </h3>

                    {isAuth ? (
                        <ul>
                            <Link style={linkStyle} to="/me">
                                ME
                            </Link>
                            <button type="button" onClick={logout}>logout</button>
                        </ul>
                    ) : (
                        <button type="button" onClick={login}>login</button>
                    )}
                </div>
            )}
        </AuthConsumer>
    </header>
);

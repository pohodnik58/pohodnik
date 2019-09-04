import React from 'react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../contexts/AuthContext';

export default () => (
    <header>
        <AuthConsumer>
            {({ isAuth, login, logout }) => (
                <div>
                    <h3>
                        <Link to="/">
                            HOME
                        </Link>
                    </h3>

                    {isAuth ? (
                        <ul>
                            <Link to="/me">
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

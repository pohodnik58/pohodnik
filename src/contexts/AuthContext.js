import React from 'react';
import PropTypes from 'prop-types';
import { loginCheck } from '../services/authService';
import { success } from '../helpers/message';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            isAuthLoading: false,
            user: null
        };
    }

    componentDidMount = async () => {
        this.setState({ isAuthLoading: true });
        const userData = await loginCheck();
        if (userData.user) {
            this.setState({
                isAuth: true,
                user: userData.user
            });
        }
        this.setState({
            isAuthLoading: false
        });
    }

    loginHandler = async (data, cb) => {
        success('welcome');
        const date = new Date(Date.now() + 86400e3);
        document.cookie = `user=${data.userId}; expires=${date.toUTCString()}`;
        document.cookie = `hash=${data.hash}; expires=${date.toUTCString()}`;
        const { user } = await loginCheck();
        console.info('USER', data);

        this.setState({
            isAuth: true,
            user: { ...data, ...user }
        }, cb);
    }

    logoutHandler = cb => {
        const { user } = this.state;

        const date = new Date(Date.now());
        document.cookie = `user=; expires=${date.toUTCString()}`;
        document.cookie = `hash=; expires=${date.toUTCString()}`;

        this.setState({
            isAuth: false,
            user: null
        }, cb);
        success(`До новых походов, ${user.name}`);
    }

    render() {
        const { isAuth, isAuthLoading, user } = this.state;
        const { children } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    isAuth,
                    isAuthLoading,
                    user,
                    onLogin: this.loginHandler,
                    onLogout: this.logoutHandler
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function withAuth(Component) {
    return function WrapperComponent(props) {
        return (
            <AuthContext.Consumer>
                {state => <Component {...props} auth={state} />}
            </AuthContext.Consumer>
        );
    };
}

export const AuthConsumer = AuthContext.Consumer;

export default { AuthProvider, AuthConsumer, withAuth };

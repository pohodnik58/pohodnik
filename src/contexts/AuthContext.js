import React from 'react';
import PropTypes from 'prop-types';
import { loginCheck } from '../services/authService';

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
        console.info('USER', data);

        this.setState({
            isAuth: true,
            user: data
        }, cb);
    }

    logoutHandler = cb => {
        this.setState({
            isAuth: false,
            user: null
        }, cb);
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

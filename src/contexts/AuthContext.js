import React from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: false,
            user: null
        };
    }

    loginHandler = async (data, cb) => {
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
        const { isAuth, user } = this.state;
        const { children } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    isAuth,
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

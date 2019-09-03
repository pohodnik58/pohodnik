import React from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export class AuthProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isAuth: false };
    }

    login = () => {
        setTimeout(() => this.setState({ isAuth: true }), 1000);
    }

    logout = () => {
        this.setState({ isAuth: false });
    }

    render() {
        const { isAuth } = this.state;
        const { children } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    isAuth,
                    login: this.login,
                    logout: this.logout
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

export const AuthConsumer = AuthContext.Consumer;

export default { AuthProvider, AuthConsumer };

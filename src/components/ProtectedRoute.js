import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, } from 'react-router-dom';
import { AuthConsumer, } from '../AuthContext';

function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <AuthConsumer>
            {({ isAuth, }) => (
                <Route
                    render={props => (isAuth ? <Component {...props} /> : <Redirect to="/" />)}
                    {...rest}
                />
            )}
        </AuthConsumer>
    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.node.isRequired,
};
export default ProtectedRoute;

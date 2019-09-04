import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../contexts/AuthContext';

function ProtectedRoute({ component: Component, ...rest }) {
    const { isAuth = false } = rest.auth;
    return (

        <Route
            render={props => {
                if (isAuth) {
                    return <Component {...props} />;
                }

                // eslint-disable-next-line react/prop-types
                const { pathname = '', search = '' } = props.history.location;
                const backurl = pathname + search;
                return <Redirect to={`/login${backurl.length ? `?return=${backurl}` : ''}`} />;
            }}
            {...rest}
        />

    );
}
ProtectedRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
export default withAuth(ProtectedRoute);

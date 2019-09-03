import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom';

// //////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    },
};

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { redirectToReferrer: false, };
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true, });
        });
    };

    render() {
        const { from } = this.props?.location?.state || { from: { pathname: '/' } };
        const { redirectToReferrer, } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div>
                <p>
                    You must log in to view the page at
                    {from.pathname}
                </p>
                {/* eslint-disable-next-line react/button-has-type */}
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}

function AuthExample() {
    return (
        <Router>
            <div>
                <AuthButton />
                <ul>
                    <li>
                        <Link to="/public">Public Page</Link>
                    </li>
                    <li>
                        <Link to="/protected">Protected Page</Link>
                    </li>
                </ul>
                {VERSION.toString()}
                <Route path="/public" component={Public} />
                <Route path="/login" component={Login} />
                <PrivateRoute path="/protected" component={Protected} />
            </div>
        </Router>
    );
}

const AuthButton = withRouter(
    ({ history, }) => (fakeAuth.isAuthenticated ? (
        <p>
                Welcome!
            {' '}
            <button
                type="button"
                onClick={() => {
                    fakeAuth.signout(() => history.push('/'));
                }}
            >
                    Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    ))
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location, },
                    }}
                />
            ))}
        />
    );
}

PrivateRoute.propTypes = {
    location: PropTypes.shape({}).isRequired,
    component: PropTypes.node.isRequired
};

export default AuthExample;

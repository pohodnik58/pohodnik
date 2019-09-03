import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { AuthProvider, } from '../AuthContext';
import Header from '../components/Header';
import ProtectedRoute from '../components/ProtectedRoute';
import routes from '../router';

export class App extends React.Component {
    getRoutes() {
        return routes.map(route => {
            const RouteComponent = route.private ? ProtectedRoute : Route;
            return <RouteComponent path={route.path} component={route.component} />;
        });
    }

    render() {
        return (
            <div>
                <AuthProvider>
                    <Router>
                        <Header />
                        <Switch>
                            {this.getRoutes()}
                        </Switch>
                    </Router>
                </AuthProvider>
            </div>
        );
    }
}

export default {App};

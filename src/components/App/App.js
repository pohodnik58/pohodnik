import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import logo from '../../images/pohColor.svg';
import img from '../../images/tree1.png';
import routes from '../../router';

class App extends React.Component {
    getRoutes() {
        return routes.map(route => {
            const RouteComponent = route.private ? ProtectedRoute : Route;
            return (
                <RouteComponent
                    exact={!!route.exact}
                    key={route.path}
                    path={route.path}
                    component={route.component}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <AuthProvider>
                    <Router>
                        <img src={logo} alt="d" />
                        <img src={img} alt="d" />
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

export default App;

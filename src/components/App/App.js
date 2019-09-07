import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from 'src/contexts/AuthContext';
import Header from 'src/components/Header';
import ProtectedRoute from 'src/components/ProtectedRoute';
import logo from 'src/images/pohColor.svg';
import img from 'src/images/tree1.png';
import routes from 'src/router';

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

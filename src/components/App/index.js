import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Breadcrumb, Layout } from 'antd';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from '../Header';
import Footer from '../Footer';
import ProtectedRoute from '../ProtectedRoute';
import routes from '../../router';

const { Content } = Layout;

class Index extends React.Component {
    getRoutes() {
        return routes.map(route => {
            const RouteComponent = route.private ? ProtectedRoute : Route;
            return React.createElement(RouteComponent, {
                exact: !!route.exact,
                key: route.path,
                path: route.path,
                component: route.component
            });
        });
    }

    render() {
        return (
            <div>
                <AuthProvider>
                    <Router>
                        <Layout className="layout">
                            <Header />
                            <Content style={{ padding: '0 50px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>List</Breadcrumb.Item>
                                    <Breadcrumb.Item>App</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="site-layout-content">
                                    <Switch>
                                        {this.getRoutes()}
                                    </Switch>
                                </div>
                                <Footer />
                            </Content>
                        </Layout>
                    </Router>
                </AuthProvider>
            </div>
        );
    }
}

export default Index;

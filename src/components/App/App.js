import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Header from '../Header';
import ProtectedRoute from '../ProtectedRoute';
import logo from '../../images/pohColor.svg';
import img from '../../images/tree1.png';
import routes from '../../router';
import {Breadcrumb, Layout } from "antd";

const {Content, Footer} = Layout;

class App extends React.Component {
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
                                <div className="site-layout-content">Content</div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
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

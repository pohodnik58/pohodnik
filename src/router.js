import React from 'react';
import Page from './components/Page';
import Login from './apps/Login';

/**
 * Главный роутер приложения
 * работает на базе {@link https://reacttraining.com/react-router/web/guides/quick-start React router}
 */
export default [
    {
        path: '/',
        component: () => <Page title="Main">Main page content</Page>,
        exact: true
    },
    {
        path: '/hiking',
        component: () => <Page title="hiking">hiking page content here</Page>,
    },
    {
        path: '/routes',
        component: () => <Page title="routes">routes page content here</Page>,
    },
    {
        path: '/login',
        component: () => <Login />,
    },
    {
        path: '/logout',
        component: () => <Page title="logout">good by</Page>,
    },
    {
        path: '/me',
        private: true,
        component: () => <div><Page title="Personal page">a private page</Page></div>,
    },
];

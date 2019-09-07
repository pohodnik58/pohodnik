import React from 'react';
import Page from './components/Page';

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
        path: '/about',
        component: () => <Page title="Abouut">About page content here</Page>,
    },
    {
        path: '/login',
        component: () => <Page title="Login">Login content here</Page>,
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

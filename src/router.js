import React from 'react';
import Page from './components/Page';

export default [
    {
        path: '/',
        component: <Page title="Main">Main page content</Page>,
        exact: true
    },
    {
        path: '/about',
        component: <Page title="Abouut">About page content here</Page>,
    },
    {
        path: '/login',
        component: <Page title="Login">Login content here</Page>,
    },
    {
        path: '/logout',
        component: <Page title="logout">good by</Page>,
    },
    {
        path: '/me',
        private: true,
        component: <Page title="Personal page">a private page</Page>,
    },
];

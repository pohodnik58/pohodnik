module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        "react/jsx-filename-extension": ['off', { extensions: ['.jsx'] }],
        "react/jsx-indent": ["error", 4, {checkAttributes: false, indentLogicalExpressions: true}],
        "react/jsx-indent-props": ["error", 4],
        "indent": ["error", 4],
        "comma-dangle": ["warn", "always"],
        "linebreak-style": ["error", "windows"],
    },
};

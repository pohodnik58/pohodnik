import React from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import {
    Form, Input, Button, Checkbox
} from 'antd';
import style from './style.m.less';
import { login } from '../../services/authService';
import { AuthConsumer } from '../../contexts/AuthContext';
import { error } from '../../helpers/message';

const layout = {
    labelCol: {
        span: 12,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const Login = () => {
    const history = useHistory();
    const onFinish = async (values, onLogin) => {
        const result = await login(values);
        if (result?.userId) {
            const search = queryString.parse(history.location.search) || {};
            onLogin(
                {
                    id: result.userId,
                    hash: result.hash
                },
                () => history.push(search.return || '/')
            );
        } else {
            error(result.error?.message || result.error);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <AuthConsumer>
            {({ onLogin }) => (
                <section className={style.loginFormWrapper}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={values => onFinish(values, onLogin)}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Имя пользователя"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите имя пользователя!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Пароль"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите пароль!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            )}
        </AuthConsumer>
    );
};

export default Login;

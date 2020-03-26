import React from 'react';
import {
    Form, Input, Button, Checkbox
} from 'antd';
import style from './style.m.less';
import { post } from '../../helpers/httpClient';

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
    const onFinish = async values => {
        console.log('Success:', values);
        const result = await post('/ajax/login_start.php', { login: values.username, psw: values.password });
        console.log('Success:', values, result);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <section className={style.loginFormWrapper}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
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
    );
};

export default Login;

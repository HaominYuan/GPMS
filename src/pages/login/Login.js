import React, { useContext } from 'react'
import { Form, Input, Button, Layout } from 'antd';
import style from './login.module.scss'
import { Redirect, useLocation } from 'react-router-dom';
import { RootStoreContext } from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
const { Header, Content } = Layout;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = observer(() => {
    const { authStore } = useContext(RootStoreContext)
    const location = useLocation()

    const onFinish = ({ username, password }) => {
        authStore.login(username, password)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            { authStore.status && <Redirect to={{ pathname: location.state ? location.state.referrer : "/home" }} />}

            <Layout>
                <Header style={{ background: "pink" }} />

                <Content style={{ background: "white" }}>
                    <div className={style.login}>

                        <div className={style.title}>鲜花订购网</div>

                        <Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </>
    );
})

export default Login
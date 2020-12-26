import React from 'react'
import { Form, Input, Button } from 'antd';
import style from './login.module.scss'
import { useAuth } from '../auth/Auth';
import { useHistory } from 'react-router-dom';


const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login =  () => {
    const { signin } = useAuth()
    const history = useHistory()

    const onFinish = ({username, password}) => {
        signin((response) => {
            if (response.data.state === "Yes") {
                history.push("/home")
            } else {
                console.log("password error")
            }
        }, {username, password})
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={style.login}>
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
        
    );
}

export default Login
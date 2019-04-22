import React from 'react'
import {
    Form, Icon, Input, Checkbox, Radio, Button
} from 'antd';
import axios from 'axios';
import qs from 'qs'
import { LoginSession } from '../../util'

const path = 'http://localhost:80'
class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { login_type, nickname, password } = values;
                const user = { login_type, nickname, password };
                    axios({
                        method: 'post',
                        url: `${path}/public?public=login`,
                        data: qs.stringify(user),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        },
                    }).then(function (response) {
                        if (response.data.msg === "login_fail") {

                        }
                        else if (response.data.msg === "login_success") {
                            LoginSession('login',user)
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item
                    label="用户类型">
                    {getFieldDecorator('login_type', {
                        rules: [{ required: true, message: 'Please input your userType!' }],
                    })(
                        <Radio.Group>
                            <Radio value="admin">管理员</Radio>
                            <Radio value="person">个人用户</Radio>
                            <Radio value="enterprise">企业用户</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="#1" style={{ float: 'right' }}>Forgot password</a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        Log in
                    </Button>
                    Or <a href="#3">register now!</a>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);




export default WrappedNormalLoginForm;
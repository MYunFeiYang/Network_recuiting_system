import React from 'react'
import {
    Form, Icon, Input, Checkbox, Radio, Button, Alert
} from 'antd';

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { login_type, nickname, password } = values;
                const user = { login_type, nickname, password };
                this.props.login(user);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"
                style={{
                    width: '40%', margin: '5% auto', padding: '20px',minWidth:'320px',
                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 255, .2)',
                }}>
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
                {this.props.alertVisible ? (
                    <Alert
                        message="用户名或密码错误"
                        type="error"
                        closable afterClose={this.props.changeAlertVisible}
                    />
                ) : null}
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="../retrievePassword" style={{ float: 'right' }}>Forgot password</a>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: '100%' }}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm
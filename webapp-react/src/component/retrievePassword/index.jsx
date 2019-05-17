import React from 'react'
import { Steps, Input, Form, Button, Icon } from 'antd';
import '../../style/App.scss'
import axios from 'axios'
import qs from 'qs'
import { emailNotExist, Inconsistent, modifyPasswordFail } from '../../util'
const Step = Steps.Step;

const path = 'http://localhost:80'
class RetrievePassword extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 0,
            email: '',
            nickname: '',
            password: ''
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.email) {
                    this.checkEmail(values.email)
                } else if (values.nickname) {
                    this.setUser(values.nickname, values.password)
                } else {
                    this.confirmInformation(values.confirmNickname, values.confirmPassword)
                }
            }
        });
    };
    confirmInformation = (nickname, password) => {
        if (this.state.nickname === nickname && this.state.password === password) {
            const { nickname, password, email } = this.state;
            axios({
                method: "post",
                url: `${path}/public?public=updatePassword`,
                data: qs.stringify({ nickname, password, email }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                }
            }).then(response => {
                if (response.data.msg === "updatePassword_fail") {
                    modifyPasswordFail()
                } else {
                    this.setState({
                        current: 4
                    })
                }
            }).catch(error => {
                console.log(error);
            });

        } else {
            Inconsistent()
        }
    }
    setUser = (nickname, password) => {
        this.setState({
            nickname,
            password
        })
        this.nextStep()
    }
    checkEmail = (value) => {
        axios({
            method: "post",
            url: `${path}/public?public=checkemail`,
            data: qs.stringify({ email: value }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        }).then(response => {
            if (response.data.msg === "email_exist") {
                this.setState({
                    email: value
                });
                this.nextStep()
            } else {
                emailNotExist();
            }
        }).catch(error => {
            console.log(error);
        });
    }
    nextStep = () => {
        let current = this.state.current;
        this.setState({
            current: current + 1
        })
    }
    Previous = () => {
        let current = this.state.current;
        this.setState({
            current: current - 1
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const current = this.state.current;
        let progress;
        switch (current) {
            case 1:
                progress = <Form onSubmit={this.handleSubmit} className="RetrievePassword">
                    <Form.Item>
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: 'Please input your nickname!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="nickname"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.Previous}>上一步</Button>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>
                </Form>
                break;
            case 2:
                progress = <Form onSubmit={this.handleSubmit} className="RetrievePassword">
                    <Form.Item>
                        {getFieldDecorator('confirmNickname', {
                            rules: [{ required: true, message: 'Please input your confirmNickname!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="confirmNickname"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('confirmPassword', {
                            rules: [{ required: true, message: 'Please input your confirmPassword!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="confirmPassword"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.Previous}>上一步</Button>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>
                </Form>
                break;
            case 0:
                progress = <Form onSubmit={this.handleSubmit} className="RetrievePassword">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Please input your email!' }],
                        })(
                            <Input
                                prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="email"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>
                </Form>
                break;
            default:
                break;
        }
        return <div id="retrievePassword">
            <Steps current={this.state.current}>
                <Step title="验证邮箱" description="邮箱是否存在." />
                <Step title="设置密码" description="设置新的密码." />
                <Step title="确认密码" description="防止密码输入错误." />
                <Step title="修改密码" description="密码修改成功." />
            </Steps>
            {progress}
        </div>

    }
}
const WrappedNormalLoginForm = Form.create({ name: 'RetrievePassword' })(RetrievePassword);
export default WrappedNormalLoginForm;
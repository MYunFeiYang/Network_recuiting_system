import React from 'react'
import {
    Form, Input, Tooltip, Icon, Select, Button
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { checkEmail ,messageNotification} from '../../util';

const { Option } = Select;
const path = 'http://localhost:80'
class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { nickname, password, name, email, telephone } = values
                const user = { nickname, password, name, email, telephone };
                checkEmail(this.props.form.getFieldValue('email'), () => {
                    this.register(user);
                })
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('你输入的两次密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    register = (data) => {
        axios({
            method: 'post',
            url: `${path}/person?person=register`,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then(function (response) {
            if (response.data.msg === "assessing") {
                window.location.href = 'http://localhost:3000/login'
            }
            else {
                messageNotification("注册提醒","用户名和密码已经存在，请重新输入");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
            </Select>
        );

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} id="registerPerson">
                <Form.Item
                    label={(
                        <span>
                            用户名&nbsp;
                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入你的用户名!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入你的密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </Form.Item>
                <Form.Item
                    label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item
                    label="姓名"
                >
                    {getFieldDecorator('name', {

                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="邮件"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入有效邮箱!',
                        }, {
                            required: true, message: '请输入你的邮箱!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="电话"
                >
                    {getFieldDecorator('telephone', {
                        rules: [{ required: true, message: '请输入你的联系电话!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;
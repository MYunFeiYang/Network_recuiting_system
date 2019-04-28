import React from 'react'
import {
    Form, Input, Tooltip, Icon, Select, Button
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { ModifyUserSuccess } from '../../util';

const { Option } = Select;
const path = 'http://localhost:80'
class UserInformation extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const oldnickname=this.props.user.nickname;
                const oldpassword=this.props.user.password;
                const { nickname, password, name, email, telephone } = values
                const user = { nickname, password, name, email, telephone,oldpassword,oldnickname };
                this.modifyUser(user);
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
    modifyUser = (data) => {
        axios({
            method: 'post',
            url: `${path}/person?person=modifyUser`,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then(function (response) {
            if (response.data.msg === "modify_user_success") {
                ModifyUserSuccess()
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
            <Form {...formItemLayout} onSubmit={this.handleSubmit}
                style={{
                    width: '40%', margin: '1% 30%', padding: '20px',
                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 255, .2)',
                }}>
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
                        initialValue: this.props.user.nickname,
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
                            initialValue: this.props.user.password,
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
                        initialValue: this.props.user.password,
                        rules: [{
                            initialValue: this.props.user.password,
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
                        initialValue: this.props.user.name,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="邮件"
                >
                    {getFieldDecorator('email', {
                        initialValue: this.props.user.email,
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
                        initialValue: this.props.user.telephone,
                        rules: [{ required: true, message: '请输入你的联系电话!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认提交</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedUserInformation = Form.create({ name: 'register' })(UserInformation);
export default connect((state) => ({
    ...state
}))(WrappedUserInformation);
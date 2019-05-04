import React from 'react'
import {
    Form, Input, Select, Button, DatePicker
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { addResumeSuccess, addResumeFail } from '../../util';


const { Option } = Select;
const path = 'http://localhost:80'
class Resume extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        admission_data: '',
        graduation_data: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const admission_data = this.state.admission_data;
                const graduation_data = this.state.graduation_data;
                const nickname = this.props.user.nickname;
                const password = this.props.user.password;
                const { age, sex, name, email, telephone, origin, collage, specialty, degree } = values
                const resume = {
                    nickname, password, name, email, age, sex, telephone, origin,
                    collage, specialty, degree, admission_data, graduation_data
                };
                this.addResume(resume);
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
    addResume = (data) => {
        axios({
            method: 'post',
            url: `${path}/person?person=addResume`,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then(function (response) {
            if (response.data.msg === "add_resume_success") {
                addResumeSuccess();
            } else {
                addResumeFail();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    handleAdmissionData = (date, dateString) => {
        this.setState({
            admission_data: dateString,
        })
    }
    handleGraduationData = (date, dateString) => {
        this.setState({
            graduation_data: dateString,
        })
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
        const resume = this.props.resume[0];
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}
                style={{
                    width: '40%', margin: '1% 30%', padding: '20px',
                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 255, .2)',
                }}>

                <Form.Item
                    label="姓名"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入你的姓名!',
                        }],
                        initialValue: resume.name,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="性别"
                >
                    {getFieldDecorator('sex', {
                        initialValue: resume.sex,
                        rules: [{
                            required: true, message: '请输入你的性别!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="年龄"
                >
                    {getFieldDecorator('age', {
                        initialValue: resume.age,
                        rules: [{
                            required: true, message: '请输入你的年龄!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="邮件"
                >
                    {getFieldDecorator('email', {
                        initialValue: resume.email,
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
                        initialValue: resume.telephone,
                        rules: [{ required: true, message: '请输入你的联系电话!' }],
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>
                <Form.Item
                    label="籍贯"
                >
                    {getFieldDecorator('origin', {
                        rules: [{
                            required: true, message: '请输入你的籍贯!',
                        }],
                        initialValue: resume.origin,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="大学"
                >
                    {getFieldDecorator('collage', {
                        initialValue: resume.collage,
                        rules: [{
                            required: true, message: '请输入你的大学!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="专业"
                >
                    {getFieldDecorator('specialty', {
                        initialValue: resume.specialty,
                        rules: [{
                            required: true, message: '请输入你的专业!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="学历"
                >
                    {getFieldDecorator('degree', {
                        initialValue: resume.degree,
                        rules: [{
                            required: true, message: '请输入学历!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="入学时间"                >
                    <DatePicker onChange={this.handleAdmissionData} />
                </Form.Item>
                <Form.Item
                    label="毕业时间"                >
                    <DatePicker onChange={this.handleGraduationData} />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认提交</Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedresumeInformation = Form.create({ name: 'register' })(Resume);
export default connect((state) => ({
    ...state
}))(WrappedresumeInformation);
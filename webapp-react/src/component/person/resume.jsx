import React from 'react'
import {
    Form, Input, Select, Button, DatePicker, InputNumber
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { messageNotification } from '../../util';
import '../../style/App.scss'


const { Option } = Select;
const path = 'http://localhost:80'
class Resume extends React.Component {
    constructor() {
        super();
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            admission_data: '',
            graduation_data: '',
            sex: '1',
        };
    }

    onChange = value => {
        this.setState({
            sex: value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { admission_data, graduation_data, sex } = this.state;
                const { nickname, password } = this.props.user;
                const resume = {
                    nickname, password, admission_data, graduation_data, sex, ...values
                };
                this.addResume(resume);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
                messageNotification("添加简历", "简历已添加成功");
            } else {
                messageNotification("添加简历", "请不要添加重复简历");
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
        let resume = this.props.resume[0];
        if (resume === undefined) {
            resume = {};
        }
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

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
                >{getFieldDecorator('sex', {
                    initialValue: this.state.sex,
                    rules: [{
                        required: true, message: '请输入你的年龄!',
                    }]
                })(
                    <Select onChange={this.onChange}>
                        <Option value="1">男</Option>
                        <Option value="0">女</Option>
                    </Select>
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
                        <InputNumber min={1} max={100} />
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
                        <Select>
                            <Option value="中专">中专</Option>
                            <Option value="高中">高中</Option>
                            <Option value="大专">大专</Option>
                            <Option value="本科">本科</Option>
                            <Option value="硕士">硕士</Option>
                            <Option value="博士">博士</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    label="求职期望"
                >
                    {getFieldDecorator('career_objective', {
                        initialValue: resume.career_objective,
                        rules: [{
                            required: true, message: '请输入求职期望!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="最低薪资"
                >
                    {getFieldDecorator('min_salary', {
                        initialValue: resume.min_salary,
                        rules: [{
                            required: true, message: '请输入你的期望最低薪资!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="最高薪资"
                >
                    {getFieldDecorator('max_salary', {
                        initialValue: resume.max_salary,
                        rules: [{
                            required: true, message: '请输入你的期望最高薪资!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="期望城市"
                >
                    {getFieldDecorator('expected_city', {
                        initialValue: resume.expected_city,
                        rules: [{
                            required: true, message: '请输入期望城市!',
                        }],
                    })(
                        <Select>
                            <Option value="武汉">武汉</Option>
                            <Option value="北京">北京</Option>
                            <Option value="上海">上海</Option>
                            <Option value="广州">广州</Option>
                            <Option value="深圳">深圳</Option>
                        </Select>
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

const WrappedresumeInformation = Form.create({ name: 'resume' })(Resume);
export default connect((state) => ({
    ...state
}))(WrappedresumeInformation);
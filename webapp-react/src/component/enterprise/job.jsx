import React from 'react'
import {
    Form, Input, Button, DatePicker
} from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import { messageNotification} from '../../util';


const path = 'http://localhost:80'
class Job extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        publish_time: '',
        effective_time: ''
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const publish_time = this.state.publish_time;
                const effective_time = this.state.effective_time;
                const nickname = this.props.user.nickname;
                const password = this.props.user.password;
                const { name, address, industry, position, number, salary, telephone, email } = values
                const job = {
                    nickname, password, name, address, industry, position, number, salary,
                    telephone, email, effective_time, publish_time
                };
                console.log(job)
                this.addjob(job);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    addjob = (data) => {
        axios({
            method: 'post',
            url: `${path}/enterprise?enterprise=addJob`,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then(function (response) {
            if (response.data.msg === "add_job_success") {
                messageNotification("岗位管理","岗位已添加成功");
            } else {
                messageNotification("岗位管理","请不要添加重复岗位");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    handlePublishTime = (date, dateString) => {
        this.setState({
            publish_time: dateString,
        })
    }
    handleEffectiveTime = (date, dateString) => {
        this.setState({
            effective_time: dateString,
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

        const job = this.props.job[0];
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}
                style={{
                    width: '40%', margin: '1% 30%', padding: '20px',
                    boxShadow: '2px 2px 2px 1px rgba(0, 0, 255, .2)',
                }}>

                <Form.Item
                    label="公司名"
                >
                    {getFieldDecorator('name', {
                        initialValue: job.name,
                        rules: [{
                            required: true, message: '请输入公司名!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="地址"
                >
                    {getFieldDecorator('address', {
                        initialValue: job.address,
                        rules: [{
                            required: true, message: '请输入地址!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="行业"
                >
                    {getFieldDecorator('industry', {
                        initialValue: job.industry,
                        rules: [{
                            required: true, message: '请输入行业!',
                        }]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="岗位"
                >
                    {getFieldDecorator('position', {
                        initialValue: job.position,
                        rules: [{
                            required: true, message: '请输入岗位!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="人数"
                >
                    {getFieldDecorator('number', {
                        initialValue: job.number,
                        rules: [{ required: true, message: '请输入人数!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="薪资"
                >
                    {getFieldDecorator('salary', {
                        rules: [{
                            required: true, message: '请输入薪资!',
                        }],
                        initialValue: job.salary,
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="发布时间"                >
                    <DatePicker onChange={this.handlePublishTime} />
                </Form.Item>
                <Form.Item
                    label="有效时间"                >
                    <DatePicker onChange={this.handleEffectiveTime} />
                </Form.Item>
                <Form.Item
                    label="电话"
                >
                    {getFieldDecorator('telephone', {
                        initialValue: job.telephone,
                        rules: [{
                            required: true, message: '请输入电话!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        initialValue: job.email,
                        rules: [{
                            required: true, message: '请输入邮箱!',
                        }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确认提交</Button>
                </Form.Item>

            </Form>
        );
    }
}

const WrappedjobInformation = Form.create({ name: 'register' })(Job);
export default connect((state) => ({
    ...state
}))(WrappedjobInformation);
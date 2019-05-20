import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios';
import qs from 'qs';
import {messageNotification} from '../../util'
import '../../style/App.scss'

const path = 'http://localhost'
class PreferenceForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.updateResumePreference(values)
            }
        });
    };
    updateResumePreference = (preference) => {
        const { nickname, password } = this.props.user;
        axios({
            url: `${path}/enterprise?enterprise=updateResumePreference`,
            method: 'post',
            data: qs.stringify({ nickname, password, ...preference }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if(responese.data.msg==="modify_resumePreference_success"){
                messageNotification("更新简历偏好","简历偏好已更新成功")
            }
        }).catch((err) => {

        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { positions, cities, min_salary ,max_salary} = this.props.preference
        return (<div id="preference">
            <Card title="简历偏好说明" bordered={false} style={{ width: "100%" }}>
                <p>简历偏好用以作为每个用户简历推荐的依据</p>
                <p>每个用户在注册账号时都会生成自己的简历偏好信息</p>
                <p>用户发布修改岗位会影响系统对用户简历偏好的判断</p>
                <p>系统会根据用户的浏览记录更新用户的简历偏好</p>
                <p>用户可以手动设置自己的简历偏好</p>
            </Card>
            <Form onSubmit={this.handleSubmit} className="preference">
                <Form.Item>
                    {getFieldDecorator('positions', {
                        rules: [{ required: true, message: 'Please input your positions!' }],
                        initialValue: positions
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="positions"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('cities', {
                        rules: [{ required: true, message: 'Please input your cities!' }],
                        initialValue: cities
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="cities"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('min_salary', {
                        rules: [{ required: true, message: 'Please input your min_salary!' }],
                        initialValue: min_salary
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="min_salary"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('max_salary', {
                        rules: [{ required: true, message: 'Please input your max_salary!' }],
                        initialValue: max_salary
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="max_salary"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="preference-button">
                        修改
          </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }
}

const WrappedPreferenceForm = Form.create({ name: 'preference' })(PreferenceForm);

export default connect((state) => ({
    ...state
}))(WrappedPreferenceForm);
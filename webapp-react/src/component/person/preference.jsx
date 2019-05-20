import React from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'qs';
import {messageNotification} from '../../util'
import '../../style/App.scss'

const path = 'http://localhost'
class ResumePreferenceForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.updateJobPreference(values);
            }
        });
    };
    updateJobPreference = (preference) => {
        const { nickname, password } = this.props.user;
        axios({
            url: `${path}/person?person=updateJobPreference`,
            method: 'post',
            data: qs.stringify({ nickname, password, ...preference }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
           if(responese.data.msg==="updateJobPreference_success"){
            messageNotification("更新岗位偏好","岗位偏好已更新")
           }
        }).catch((err) => {

        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { career_objective, min_salary, expected_city ,max_salary} = this.props.preference
        return (<div id="preference">
            <Card title="岗位偏好说明" bordered={false} style={{ width: "100%" }}>
                <p>岗位偏好用以作为每个用户岗位推荐的依据</p>
                <p>每个用户在注册账号时都会生成自己的岗位偏好信息</p>
                <p>用户添加修改简历会影响系统对用户简历偏好的判断</p>
                <p>系统会根据用户的浏览记录更新用户的岗位偏好</p>
                <p>用户可以手动设置自己的岗位偏好</p>
            </Card>
            <Form onSubmit={this.handleSubmit} className="preference">
                <Form.Item>
                    {getFieldDecorator('career_objective', {
                        rules: [{ required: true, message: 'Please input your career_objective!' }],
                        initialValue: career_objective
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="career_objective"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('expected_city', {
                        rules: [{ required: true, message: 'Please input your expected_city!' }],
                        initialValue: expected_city
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="expected_city"
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

const WrappedPreferenceForm = Form.create({ name: 'preference' })(ResumePreferenceForm);

export default connect((state) => ({
    ...state
}))(WrappedPreferenceForm);
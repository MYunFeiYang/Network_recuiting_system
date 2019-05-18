import React, { Fragment } from 'react';
import { Table, Button, Divider, } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../redux/actions/';
import axios from 'axios';
import qs from 'qs';
import { messageNotification } from '../../../util'

const path = 'http://localhost'


class EnterpriseAssess extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                editable: true,
            }, {
                title: '用户名',
                dataIndex: 'nickname',
                key: 'nickname',
                editable: true,
            }, {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
                editable: true,
            }, {
                title: '电话',
                dataIndex: 'telephone',
                key: 'telephone',
                editable: true,
            }, {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                editable: true,
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Button onClick={() => {
                            this.personAssessmentPass(record);
                        }}>通过</Button>
                        <Divider type="vertical" />
                        <Button >不通过</Button>
                    </Fragment >
                ),
            }]
        }
    }
    handleDelete = (key) => {
        const dataSource = this.props.assess;
        this.props.setResumeInformation(dataSource.filter(item => item.key !== key));
    }

    personAssessmentPass = (record) => {
        const { nickname, password } = record;
        axios({
            url: `${path}/admin/enterprise_assessment/pass`,
            method: 'post',
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'enterprise_assessment_pass') {
                messageNotification("注册审核","注册审核痛过");
                this.handleDelete(record.key)
            }
        }).catch((err) => {

        })
    }

    render() {
        return <Table
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={this.props.assess}
            columns={this.state.columns} />;
    }
}
export default connect((state) => ({
    ...state
}), actions)(EnterpriseAssess);
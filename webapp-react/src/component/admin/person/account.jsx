import React, { Fragment } from 'react';
import { Table, Button, } from 'antd';
import { connect } from 'react-redux';
import actios from '../../../redux/actions/';
import axios from 'axios';
import qs from 'qs';
import { messageNotification } from '../../../util'

const path = 'http://localhost'


class PersonAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [{
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
                title: '登录时间',
                dataIndex: 'login_time',
                key: 'login_time',
                editable: true,
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Button onClick={() => {
                            this.personAccountDelete(record);
                        }}>注销账号</Button>
                    </Fragment >
                ),
            }]
        }
    }
    handleDelete = (key) => {
        const dataSource = this.props.assess;
        this.props.setAssessInformation(dataSource.filter(item => item.key !== key));
    }

    personAccountDelete = (record) => {
        const { nickname, password } = record;
        axios({
            url: `${path}/admin/person_account/delete`,
            method: 'post',
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'delete_account_success') {
                messageNotification("注销账号","注销账号成功");
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
}), actios)(PersonAccount);
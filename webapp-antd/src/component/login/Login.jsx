import React from 'react';
import { Modal } from 'antd';
import LoginBox from './LoginBox';
import '../../style/App.css'
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import {isLogin} from '../../util';

const path = 'http://localhost:80'
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
        }
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }
    login = (user) => {
        axios({
            method: 'post',
            url: `${path}/public?public=login`,
            data: qs.stringify(user),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            if (response.data.msg === "login_fail") {

            }
            else if (response.data.msg === "login_success") {
               isLogin('login', user);
                this.props.setUserInformation(user);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        const { visible } = this.state;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="系统登录"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false} mask={false}>
                    <LoginBox login={this.login}></LoginBox>
                </Modal>
            </div>
        );
    }
}
export default connect((state) => ({
    ...state
}), actions)(Login);
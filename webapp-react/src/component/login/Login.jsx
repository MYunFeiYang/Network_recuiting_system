import React from 'react';
import LoginBox from './LoginBox';
import '../../style/App.css'
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { isLogin } from '../../util';

const path = 'http://localhost:80'
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            alertVisible:false,
        }
    }
    changeAlertVisible=()=>{
        if(this.state.alertVisible){
            this.setState({
                alertVisible:false,
            })
        }else{
            this.setState({
                alertVisible:true,
            })
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
                this.changeAlertVisible();
            }
            else if (response.data.msg === "login_success") {
                isLogin('login', user);
                window.location.href='http://localhost:3000';
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <LoginBox login={this.login} alertVisible={this.state.alertVisible}
            changeAlertVisible={this.changeAlertVisible}></LoginBox>
        );
    }
}
export default connect((state) => ({
    ...state
}), actions)(Login);
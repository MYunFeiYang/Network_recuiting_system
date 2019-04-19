import React from 'react';
import { Modal, Button, Icon } from 'antd';
import LoginBox from './LoginBox';
import '../../style/App.css'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    render() {
        const { visible } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    <Icon type="login"></Icon> 登录
        </Button>
                <Modal
                    visible={visible}
                    title="系统登录"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <LoginBox></LoginBox>
                </Modal>
            </div>
        );
    }
}
export default Login;
import React from 'react';
import { Modal, Button } from 'antd';
import Enterprise from './Enterprise';
import Person from './Person'
import '../../style/App.css'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            person: {

            }
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
                    注册
        </Button>
                <Modal
                    visible={visible}
                    title={this.props.type}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    {this.props.type === '个人注册' ? <Person></Person> : <Enterprise></Enterprise>}
                </Modal>
            </div>
        );
    }
}
export default Login;
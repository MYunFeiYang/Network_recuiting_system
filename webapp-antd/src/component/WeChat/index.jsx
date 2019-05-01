import React from "react";
import { Row, Col, Menu, Icon, Input } from "antd";
import { connect } from 'react-redux';

const SubMenu = Menu.SubMenu;
const hostname = window.location.hostname
const url = `ws://${hostname}/init`;
const { TextArea } = Input;
class Wechat extends React.Component {
    constructor() {
        super();
        this.state = {
            socket: new WebSocket(url),
            readyState: '',
            message: [],
            myfriend: [],
            onlineList: [],
        }
    }
    addContent = (type, content) => {
        const { message } = this.state;
        message.push({
            usertype: type,
            content: content
        });
        this.setState({ message });
    }
    socketListener() {
        const { socket } = this.state;
        const nickname=this.props.user.nickname;
        console.log(this.props.user)
        socket.onopen = () => {
            this.changeStateReady();
            this.addContent('system', '欢迎加入群聊');
            this.refreshOnlineLIst();
            socket.send(JSON.stringify({nickname}));
        }
        socket.onclose = () => {
            this.changeStateReady();
        }
        socket.onmessage = () => {

        }
        socket.onerror = () => {

        }
    }
    closeSocket = () => {
        const { socket } = this.state;
        socket.close();
    }
    refreshOnlineLIst = () => {
        const { socket } = this.state;
        socket.send(JSON.stringify({ 'refresh': '' }));
    }

    changeStateReady = () => {
        const { socket } = this.state;
        switch (socket.readyState) {
            case 0:
                this.setState({
                    readyState: '正在链接中'
                });
                break;
            case 1:
                this.setState({
                    readyState: '已经链接并且可以通讯'
                });
                break;
            case 2:
                this.setState({
                    readyState: '连接正在关闭'
                });
                break;
            case 3:
                this.setState({
                    readyState: '连接已关闭或者没有链接成功'
                });
                break;
            default:
                break;
        }
    }
    encodeScript = (data) => {
        if (null === data || "" === data) {
            return "";
        }
        return data.replace("<", "&lt;").replace(">", "&gt;");
    }
    emit = (e) => {
        const { socket } = this.state;
        const text = this.encodeScript(e.target.value);
        if (text === " ") {
            return;
        } else {
            const nickname = this.props.user.nickanem;
            let msg = {
                "message": text,
                "nickname": nickname
            };
            socket.send(JSON.stringify(msg));
            this.addContent('self', text);
            e.target.value = "";
        }
    }
    render() {
        const nickname = this.props.user.nickname;
        if (nickname !== undefined ) {
            this.socketListener();
        }
        return <Row style={{ height: '100vh' }}>
            <Col span={4}>
                <Menu
                    style={{ width: '100%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>登录状态</span></span>}>
                        <Menu.Item key="1">{this.state.readyState}</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="setting" /><span>连接操作</span></span>}>
                        <Menu.Item key="2" onClick={this.closeSocket}>关闭连接</Menu.Item>
                        <Menu.Item key="3">重新连接</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="setting" /><span>我的好友</span></span>}>
                        <Menu.Item key="4" >风清扬</Menu.Item>
                        <Menu.Item key="5">云飞扬</Menu.Item>
                    </SubMenu>
                </Menu>
            </Col>
            <Col span={16} style={{ height: '100%' }}>
                <div style={{ height: '72%' }}>
                    {
                        this.state.message.map((value, index) => {
                            return <p key={index}>{value.content}</p>;
                        })
                    }
                </div>
                <TextArea rows={4} onPressEnter={this.emit} />
            </Col>
            <Col span={4} style={{ height: '100%' }}>
                <Menu
                    style={{ width: '100%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1', 'sub2']}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>在线列表</span></span>}>
                        {
                            this.state.onlineList.map((value, index) => {
                                return <Menu.Item key={index + 10}>{value}</Menu.Item>
                            })
                        }
                    </SubMenu>
                </Menu>
                <Icon type="reload" style={{ fontSize: '30px', position: 'absolute', bottom: '70px', right: '20px' }}
                    onClick={this.refreshOnlineLIst} />
            </Col>
        </Row>
    }
}
export default connect((state) => ({
    ...state
}))(Wechat);
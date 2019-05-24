import React from "react";
import { Menu, Icon, Input, Affix, Button } from "antd";
import { connect } from 'react-redux';
import '../../style/App.scss'

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
            myfriend: ["风清扬", "云飞扬"],
            onlineList: [],
            record: []
        }
        this.nickname = 0;
    }
    socketListener() {
        const { socket } = this.state;
        const nickname = this.nickname;
        if (typeof nickname === "string") {
            socket.onopen = () => {
                this.changeStateReady();
                socket.send(JSON.stringify({ nickname }));
            }
        }
        socket.onclose = () => {
            this.changeStateReady();
        }
        socket.onmessage = (evt) => {
            //群聊信息（nickname，message）
            //在线列表（nickname，session）
            //聊天记录(record,nickname)
            let data = JSON.parse(evt.data);
            if (Object.prototype.toString.call(data) === "[object Array]") {
                if (evt.data.indexOf("record") !== -1) {
                    //聊天记录
                    // show_chat_record(data);
                    data.map((value) => {
                        return value.nickname === this.nickname ? value.usertype = 'self' : value.usertype = 'other'
                    })
                    this.setState({
                        record: data
                    })
                } else {
                    //展示在线列表
                    this.setState({
                        onlineList: data
                    })
                }
            } else if (Object.prototype.toString.call(data) === "[object Object]") {
                if (data.nickname === undefined) {
                    //系统消息
                    this.addContent('system', data)
                } else {
                    //群发消息
                    // show_chat_message(data);
                    this.addContent('other', data)
                }

            }
        }
        socket.onerror = () => {
            this.changeStateReady();
        }
    }
    closeSocket = () => {
        const { socket } = this.state;
        socket.close();
    }

    reconnect = () => {
        this.setState({
            socket: new WebSocket(url),
        })
    }
    refreshOnlineLIst = () => {
        const { socket } = this.state;
        socket.send(JSON.stringify({ 'refresh': '' }));
    }
    chatRecord = () => {
        const { socket } = this.state;
        socket.send(JSON.stringify({ 'record': 1 }));
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
            const nickname = this.nickname;
            let msg = {
                "message": text,
                "nickname": nickname
            };
            socket.send(JSON.stringify(msg));
            this.addContent('self', msg);
            e.target.value = "";
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
    render() {
        const nickname = this.props.user.nickname;
        if (nickname !== undefined) {
            this.nickname = nickname;
            this.socketListener();
        }
        return <div id="wechat" >
            <div >
                <Affix offsetTop={50}>
                    <Menu
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title={<span><Icon type="appstore" />
                            <span>登录状态</span></span>}>
                            <Menu.Item key="1">{this.state.readyState}</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="setting" /><span>连接操作</span></span>}>
                            <Menu.Item key="2" onClick={this.closeSocket}>关闭连接</Menu.Item>
                            <Menu.Item key="3" onClick={this.reconnect}>重新连接</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>我的好友</span></span>}>
                            {this.state.myfriend.map((value, index) => {
                                return <Menu.Item key={`friend${index}`} >{value}</Menu.Item>
                            })}
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="appstore" />
                            <span onClick={this.refreshOnlineLIst}>在线列表</span></span>}>
                            {
                                this.state.onlineList.map((value, index) => {
                                    return <Menu.Item key={`online${index}`}>{value.nickname}</Menu.Item>
                                })
                            }
                        </SubMenu>
                    </Menu>
                </Affix>
            </div>
            <div >
                <div id="wechat_box">
                    <div >
                        <p onClick={this.chatRecord}>
                            <span>聊天记录</span>
                        </p>
                        {

                            this.state.record.map((value, index) => {
                                return <div className={value.usertype} key={index}>
                                    <h3>{value.nickname}</h3>
                                    <p>{value.record}</p>
                                </div>
                            })
                        }
                        {
                            this.state.message.map((value, index) => {
                                return <div className={value.usertype} key={index}>
                                    <h3>{value.content.nickname}</h3>
                                    <p>{value.content.message}</p>
                                </div>
                            })
                        }
                    </div>
                    <TextArea onPressEnter={this.emit} >
                        
                    </TextArea>
                    <Button type="primary">发送</Button>
                </div>
            </div>
        </div>
    }
}
export default connect((state) => ({
    ...state
}))(Wechat);
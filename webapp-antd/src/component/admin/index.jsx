import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import actions from '../../redux/actions'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AdminPower from './adminPower'

const SubMenu = Menu.SubMenu;
const path = 'http://localhost'
class Admin extends React.Component {
    state = {
        theme: 'light',
        current: '1',
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }
    getAdminInformation = () => {
        axios({
            method: 'post',
            url: `${path}/admin/power/init`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            response.data.map((value,index)=>{
                return value.key=index;
            })
            this.props.setAdminInformation(response.data);
        }).catch((err) => {

        })
    }
    render() {
        return <Row>
            <Router>
                <Col span={3}>
                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: '100%' }}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                        selectedKeys={[this.state.current]}
                        mode="inline">
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>管理员</span></span>}>
                            <Menu.Item key="1" onClick={this.getAdminInformation}>
                                <Link to={`/admin/userInformation/`}>权限管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>个人管理</span></span>}>
                            <Menu.Item key="2">注册审核</Menu.Item>
                            <Menu.Item key="3">账号管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>企业管理</span></span>}>
                            <Menu.Item key="5">注册审核</Menu.Item>
                            <Menu.Item key="6">账号管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>推广管理</span></span>}>
                            <Menu.Item key="7">个人分析</Menu.Item>
                            <Menu.Item key="8">企业分析</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={21}>
                    <Switch>
                        <Route path='/admin/userInformation/' exact component={AdminPower}></Route>
                    </Switch>
                </Col>
            </Router>
        </Row>
    }
}
export default connect((state) => ({
    ...state
}),actions)(Admin)
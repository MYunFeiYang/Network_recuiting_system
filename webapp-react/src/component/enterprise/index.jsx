import React from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../../redux/actions'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import UserInformation from './userInformation'
import Job from './job'
import ManageJob from './manageJob'

const SubMenu = Menu.SubMenu;
const path = 'http://localhost'
class Enterprise extends React.Component {
    state = {
        theme: 'light',
        current: '1',
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
    }
    getUserInformation = () => {
        const { nickname, password } = this.props.user;
        axios({
            method: 'post',
            url: `${path}/enterprise?enterprise=modifyEnterpriseBeforeSelect`,
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            const userInformation = responese.data;
            this.props.setUserInformation(userInformation);
        }).catch((err) => {

        })
    }
    initJob = () => {
        const { nickname, password } = this.props.user;
        axios({
            method: 'post',
            url: `${path}/enterprise?enterprise=initJob`,
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            const jobInformation = [];
            jobInformation.push(responese.data);
            this.props.setJobInformation(jobInformation);
        }).catch((err) => {

        })
    }
    manageJob = () => {
        const { nickname, password } = this.props.user;
        axios({
            method: 'post',
            url: `${path}/enterprise?enterprise=manageJob`,
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            this.props.setJobInformation(responese.data);
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
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        selectedKeys={[this.state.current]}
                        mode="inline">
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>企业</span></span>}>
                            <Menu.Item key="1" onClick={this.getUserInformation}>
                                <Link to={`/enterprise/userInformation/`}>修改注册信息</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>岗位</span></span>}>
                            <Menu.Item key="2" onClick={this.initJob}>
                                <Link to={`/enterprise/job/`}>岗位发布</Link>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.manageJob}>
                                <Link to={`/enterprise/manageJob/`}>岗位管理</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>简历</span></span>}>
                            <Menu.Item key="5">简历推荐</Menu.Item>
                            <Menu.Item key="6">推荐设置</Menu.Item>
                            <Menu.Item key="7">简历收藏</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Col>
                <Col span={21}>
                    <Switch>
                        <Route exact path='/enterprise/userInformation/' component={UserInformation}></Route>
                        <Route exact path='/enterprise/job/' component={Job}></Route>
                        <Route exact path='/enterprise/manageJob/' component={ManageJob}></Route>
                    </Switch>
                </Col>
            </Router>
        </Row>
    }
}
export default connect((state) => ({
    ...state
}), actions)(Enterprise)
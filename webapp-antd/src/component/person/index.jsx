import React, { Fragment } from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import UserInformation from './userInformation'

const SubMenu = Menu.SubMenu;
const path = 'http://localhost'
class Person extends React.Component {
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
            url: `${path}/person?person=modifyUserBeforeSelect`,
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
    render() {
        return <Fragment>
            <Row>
                <Router>
                    <Col span={3}>
                        <Menu
                            theme={this.state.theme}
                            onClick={this.handleClick}
                            style={{ width: '100%' }}
                            defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                            selectedKeys={[this.state.current]}
                            mode="inline">
                            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>个人</span></span>}>
                                <Menu.Item key="1" onClick={this.getUserInformation}>
                                    <Link to={`/person/userInformation/`}>修改注册信息</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>简历</span></span>}>
                                <Menu.Item key="2">添加简历</Menu.Item>
                                <Menu.Item key="3">简历管理</Menu.Item>
                                <Menu.Item key="4">上传简历</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>岗位</span></span>}>
                                <Menu.Item key="5">岗位推荐</Menu.Item>
                                <Menu.Item key="6">岗位偏好</Menu.Item>
                                <Menu.Item key="7">岗位收藏</Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Col>
                    <Col span={21}>
                        <Switch>
                            <Route exact path='/person/userInformation/' component={UserInformation}></Route>
                        </Switch>
                    </Col>

                </Router>
            </Row>
        </Fragment>
    }
}
export default connect((state) => ({
    ...state
}), actions)(Person)
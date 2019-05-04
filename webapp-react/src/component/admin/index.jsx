import React from 'react';
import { Row, Col, Menu, Icon, Badge, Affix } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import actions from '../../redux/actions'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AdminPower from './adminPower';
import PersonAssess from './person/assessment';
import EnterpriseAssess from './enterprise/assessment';
import PersonAccount from './person/account';
import EnterpriseAccount from './enterprise/account'

const SubMenu = Menu.SubMenu;
const path = 'http://localhost'
class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
            theme: 'light',
            current: '1',
            personRegisterCount: 0,
            enterpriseRegisterCount: 0,
        };
        this.personRegisterCount();
        this.enterpriseRegisterCount();
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
            response.data.map((value, index) => {
                return value.key = index;
            })
            this.props.setAdminInformation(response.data);
        }).catch((err) => {

        })
    }
    personRegisterCount = () => {
        axios({
            method: 'post',
            url: `${path}/admin/person_assessment/registerCount`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            const count = response.data.count;
            this.setState({
                personRegisterCount: count,
            })
        }).catch((err) => {

        })
    }
    enterpriseRegisterCount = () => {
        axios({
            method: 'post',
            url: `${path}/admin/enterprise_assessment/registerCount`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            const count = response.data.count;
            this.setState({
                enterpriseRegisterCount: count,
            })
        }).catch((err) => {

        })
    }
    personAssessmentInit = () => {
        axios({
            method: 'post',
            url: `${path}/admin/person_assessment/init`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            let assess = response.data;
            assess.map((value, index) => {
                return value.key = index;
            })
            this.props.setAssessInformation(assess);
        }).catch((err) => {

        })
    }

    enterpriseAssessmentInit = () => {
        axios({
            method: 'post',
            url: `${path}/admin/enterprise_assessment/init`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            let assess = response.data;
            assess.map((value, index) => {
                return value.key = index;
            })
            this.props.setAssessInformation(assess);
        }).catch((err) => {

        })
    }
    personAccountInit = () => {
        axios({
            method: 'post',
            url: `${path}/admin/person_account/init`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            let assess = response.data;
            assess.map((value, index) => {
                return value.key = index;
            })
            this.props.setAssessInformation(assess);
        }).catch((err) => {

        })
    }
    enterpriseAccountInit = () => {
        axios({
            method: 'post',
            url: `${path}/admin/enterprise_account/init`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((response) => {
            let assess = response.data;
            assess.map((value, index) => {
                return value.key = index;
            })
            this.props.setAssessInformation(assess);
        }).catch((err) => {

        })
    }
    render() {
        return <Row>
            <Router>
                <Col span={3}>
                    <Affix offsetTop='50'>
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
                                <Menu.Item key="2" onClick={this.personAssessmentInit}>
                                    <Link to={`/admin/personAssess/`}>
                                        注册审核 <Badge count={this.state.personRegisterCount}>
                                        </Badge>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" onClick={this.personAccountInit}>
                                    <Link to={`/admin/personAccount`}>账号管理</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>企业管理</span></span>}>
                                <Menu.Item key="5" onClick={this.enterpriseAssessmentInit}>
                                    <Link to={`/admin/enterpriseAssess/`}>
                                        注册审核  <Badge count={this.state.enterpriseRegisterCount}>
                                        </Badge>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="6" onClick={this.enterpriseAccountInit}>
                                    <Link to={`/admin/enterpriseAccount`}>账号管理</Link>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="appstore" /><span>推广管理</span></span>}>
                                <Menu.Item key="7">个人分析</Menu.Item>
                                <Menu.Item key="8">企业分析</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Affix>
                </Col>
                <Col span={21}>
                    <Switch>
                        <Route path='/admin/userInformation/' exact component={AdminPower}></Route>
                        <Route path='/admin/personAssess/' exact component={PersonAssess}></Route>
                        <Route path='/admin/enterpriseAssess/' exact component={EnterpriseAssess}></Route>
                        <Route path='/admin/personAccount/' exact component={PersonAccount}></Route>
                        <Route path='/admin/enterpriseAccount/' exact component={EnterpriseAccount}></Route>
                    </Switch>
                </Col>
            </Router>
        </Row>
    }
}
export default connect((state) => ({
    ...state
}), actions)(Admin)
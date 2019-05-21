import React from 'react';
import { Menu, Icon } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { BrowserRouter as Router, Link, Switch } from 'react-router-dom';
import { FrontendAuth1 } from '../../router/FrontendAuth'
import { primaryRouterConfig } from '../../router/router.config.jsx'


const SubMenu = Menu.SubMenu;
const path = 'http://localhost'
class Person extends React.Component {
    state = {
        theme: 'light',
        current: '1',
        loginRedirect: ''
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
    JobRecommendation = () => {
        const { nickname, password } = this.props.user;
        axios({
            method: 'post',
            url: `${path}/person?person=JobRecommendation`,
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            this.props.setJobInformation(responese.data);

        }).catch((err) => {

        })
    }
    initResume = () => {
        const { nickname, password } = this.props.user;
        axios({
            url: `${path}/person?person=initResume`,
            method: 'post',
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            let resume = [];
            resume.push(responese.data)
            this.props.setResumeInformation(resume);
        }).catch((err) => {

        })
    }
    manageResume = () => {
        const { nickname, password } = this.props.user;
        axios({
            url: `${path}/person?person=manageResume`,
            method: 'post',
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            responese.data.map((value, index) => {
                return value.key = `${index + 1}`;
            })
            this.props.setResumeInformation(responese.data);
        }).catch((err) => {

        })
    }
    getJobPreference = () => {
        const { nickname, password } = this.props.user;
        axios({
            url: `${path}/person?person=getJobPreference`,
            method: 'post',
            data: qs.stringify({ nickname, password }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            this.props.setPreferenceInformation(responese.data);
        }).catch((err) => {

        })
    }

    render() {
        return <div id="person_center">
            <Router>
                <div>

                    <Menu
                        theme={this.state.theme}
                        onClick={this.handleClick}
                        style={{ width: '100%' }}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        selectedKeys={[this.state.current]}
                        mode="inline">
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>个人</span></span>}>
                            <Menu.Item key="1" onClick={this.getUserInformation}>
                                <Link to={`/person/userInformation`}>修改注册信息</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>简历</span></span>}>
                            <Menu.Item key="2" onClick={this.initResume}>
                                <Link to={`/person/resume`}>添加简历</Link>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.manageResume}>
                                <Link to={`/person/manageResume`}>简历管理</Link>
                            </Menu.Item>
                            <Menu.Item key="4">上传简历</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>岗位</span></span>}>
                            <Menu.Item key="5" onClick={this.JobRecommendation}>
                                <Link to={`/person/recommendation`}>岗位推荐</Link></Menu.Item>
                            <Menu.Item key="6" onClick={this.getJobPreference}>
                                <Link to={`/person/preference`}>岗位偏好</Link>
                            </Menu.Item>
                            <Menu.Item key="7">岗位收藏</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div >
                    <Switch>
                        <FrontendAuth1 config={primaryRouterConfig}></FrontendAuth1>
                    </Switch>
                </div>
            </Router>
        </div>
    }
}
export default connect((state) => ({
    ...state
}), actions)(Person)
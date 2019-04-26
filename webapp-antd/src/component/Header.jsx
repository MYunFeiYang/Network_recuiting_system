import React from 'react';
import { Menu, Icon, Affix, Avatar } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './login/Login';
import Register from './register/Register';
import Audio from './audio'
import Video from './video'
import Home from './main/home'
import '../style/App.css'
import School from './main/school/';
import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import actions from '../redux/actions';
const path = 'http://localhost:80'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'home',
      user: {},
    }
  }
  isLogin = (data, user) => {
    user.login = data;
    axios({
      method: 'post',
      url: `${path}/public?public=loginSession`,
      data: qs.stringify(user),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((response) => {
      if (typeof response.data.nickname === 'string') {
        this.props.setUserInformation(response.data);
        this.props.changeLoginState(true);
      } else {
        this.props.setUserInformation({});
        this.props.changeLoginState(false);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  componentDidMount() {
    this.isLogin('refresh', {});
  }
  render() {
    return (
      <header>
        <Router>
          <Affix offsetTop={0}>
            <Menu theme="dark"
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal">
              <Menu.Item key="home">
                <Link to={`/`}><Icon type="home" />首页</Link>
              </Menu.Item>
              <Menu.Item key="school">
                <Link to={`/school/`}>校招</Link>
              </Menu.Item>
              <Menu.Item key="music">
                <Link to={`/music/`}>
                  <Icon type="customer-service" theme="filled" />音乐播放器</Link>
              </Menu.Item>
              <Menu.Item key="video">
                <Link to={`/video/`}>
                  <Icon type="video-camera" />视频播放器</Link>
              </Menu.Item>

              <Menu.Item key="login" className="float-right"
                style={{ display: (this.props.isLogin === false) ? 'block' : 'none' }}>
                <Link to={`/login/`}>
                  <Icon type="login"></Icon> 登录
                </Link>
              </Menu.Item>
              <SubMenu className="float-right" title={<span className="submenu-title-wrapper"
                style={{ display: (this.props.isLogin === false) ? 'block' : 'none' }}>
                <Icon type="user-add" />注册</span>}>
                <MenuItemGroup title={"个人注册"}>
                  <Menu.Item key="register-p">
                    <Register type="个人注册"></Register>
                  </Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="企业注册">
                  <Menu.Item key="register-e">
                    <Register type="企业注册"></Register>
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <SubMenu className="float-right" title={<span className="submenu-title-wrapper"
                style={{ display: (this.props.isLogin === false) ? 'none' : 'block' }}>
                <Avatar type='user'></Avatar>{this.props.user.nickname}</span>}>
                <MenuItemGroup>
                  <Menu.Item>
                    <Icon type="desktop" />后台管理
                  </Menu.Item>
                  <Menu.Item>
                    <Icon type="message" />在线交流
                  </Menu.Item>
                  <Menu.Item onClick={() => {
                    this.isLogin('delete', {})
                  }}>
                    <Icon type="logout" />退出登录
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>
            </Menu>
          </Affix>
          <Switch>
            <Route path="/music/" exact component={Audio} />
            <Route path="/video/" exact component={Video} />
            <Route path="/school/" exact component={School} />
            <Route path="/login/" exact component={Login} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </header>
    );
  }
}
export default connect((state) => ({
  ...state
}), actions)(Header);
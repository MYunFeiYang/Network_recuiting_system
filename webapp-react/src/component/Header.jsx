import React, { Fragment } from 'react';
import { Menu, Icon, Affix, Avatar } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './login/Login';
import Audio from './audio'
import Video from './video'
import Home from './main/home'
import Person from './person/'
import Enterprise from './enterprise/'
import RegisterPerson from './register/Person'
import RegisterEnterprise from './register/Enterprise'
import Admin from './admin/'
import Wechat from './WeChat/'
import '../style/App.scss'
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
    let loginResult;
    const loginType = this.props.user.login_type;
    switch (loginType) {
      case 'person':
        loginResult = <MenuItemGroup>
          <Menu.Item key='person'>
            <Link to={`/person/`}>
              <Icon type="desktop" />个人中心
            </Link>
          </Menu.Item>
          <Menu.Item key='message'>
            <Link to={`/wechat/`}>
              <Icon type="message" />在线交流
            </Link>
          </Menu.Item>
          <Menu.Item key='logout' onClick={() => {
            this.isLogin('delete', {})
          }}>
            <Icon type="logout" />退出登录
          </Menu.Item>
        </MenuItemGroup>
        break;
      case 'enterprise':
        loginResult = <MenuItemGroup>
          <Menu.Item key='enterprise'>
            <Link to={`/enterprise/`}>
              <Icon type="desktop" />企业中心
            </Link>
          </Menu.Item>
          <Menu.Item key='message'>
            <Link to={`/wechat/`}>
              <Icon type="message" />在线交流
            </Link>
          </Menu.Item>
          <Menu.Item key='delete' onClick={() => {
            this.isLogin('delete', {})
          }}>
            <Icon type="logout" />退出登录
          </Menu.Item>
        </MenuItemGroup>
        break;
      default:
        loginResult = <MenuItemGroup>
          <Menu.Item key='admin'>
            <Link to={`/admin/`}>
              <Icon type="desktop" />后台管理
            </Link>
          </Menu.Item>
          <Menu.Item key='message'>
            <Link to={`/wechat/`}>
              <Icon type="message" />在线交流
            </Link>
          </Menu.Item>
          <Menu.Item key='delete' onClick={() => {
            this.isLogin('delete', {})
          }}>
            <Icon type="logout" />退出登录
          </Menu.Item>
        </MenuItemGroup>
        break
    }
    return (<Fragment>
      <Router>
        <header>
          <Affix offsetTop={0}>
            <Menu theme="light"
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
              <SubMenu className="float-right"
                style={{ display: (this.props.isLogin === false) ? 'none' : 'inline-block' }}
                title={<span className="submenu-title-wrapper">
                  <Avatar type='user'></Avatar>{this.props.user.nickname}</span>}>
                {loginResult}
              </SubMenu>
              <SubMenu className="float-right"
                style={{ display: (this.props.isLogin === false) ? 'inline-block' : 'none' }}
                title={<span className="submenu-title-wrapper">
                  <Icon type="user-add" />注册</span>}>
                <MenuItemGroup >
                  <Menu.Item key="register-p">
                    <Link to={`/register/person/`}>个人注册</Link>
                  </Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup>
                  <Menu.Item key="register-e">
                    <Link to={`/register/enterprise/`}>企业注册</Link>
                  </Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="login" className="float-right"
                style={{ display: (this.props.isLogin === false) ? 'inline-block' : 'none' }}>
                <Link to={`/login/`}>
                  <Icon type="login"></Icon> 登录
                </Link>
              </Menu.Item>
            </Menu>
          </Affix>
        </header>
        <main>
          <Switch>
            <Route path="/music/" exact component={Audio} />
            <Route path="/video/" exact component={Video} />
            <Route path="/school/" exact component={School} />
            <Route path="/login/" exact component={Login} />
            <Route path="/person/" component={Person} />
            <Route path="/enterprise/" component={Enterprise} />
            <Route path="/admin/" component={Admin} />
            <Route path="/wechat/" component={Wechat} />
            <Route path="/register/enterprise/" exact component={RegisterEnterprise} />
            <Route path="/register/person" exact component={RegisterPerson} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
      </Router>
    </Fragment>
    );
  }
}
export default connect((state) => ({
  ...state
}), actions)(Header);
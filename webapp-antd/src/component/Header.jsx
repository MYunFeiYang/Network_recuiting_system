import React from 'react';
import { Menu, Icon, Affix } from 'antd';
import { BrowserRouter as Router, Link ,Route,Switch} from 'react-router-dom'
import Login from './login/Login';
import Register from './register/Register';
import Audio from './audio'
import Video from './video'
import Home from './main/home'
import '../style/App.css'
import School from './school';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  state = {
    current: 'home',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <header>
        <Affix offsetTop={0}>
          <Router>
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
              <Menu.Item key="login" className="float-right">
                <Login></Login>
              </Menu.Item>
              <SubMenu className="float-right" title={<span className="submenu-title-wrapper">
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
            </Menu>
            <Switch>
                    <Route path="/music/" exact component={Audio} />
                    <Route path="/video/" exact component={Video} />
                    <Route path="/school/" exact component={School} />
                    <Route path="/" exact component={Home} />
                </Switch>
          </Router>
        </Affix>
      </header>
    );
  }
}
export default Header;
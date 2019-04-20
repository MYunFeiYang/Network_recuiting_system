import React from 'react';
import { Menu } from 'antd';
import Login from './login/Login';
import Register from './register/Register';
import Audio from './audio'
import '../style/App.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  state = {
    current: 'mail',
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          首页
        </Menu.Item>
        <Menu.Item key="app">
          校招
        </Menu.Item>

        <SubMenu title={<span className="submenu-title-wrapper">
          注册</span>}>
          <MenuItemGroup title="个人注册">
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
        <Menu.Item key="music">
          <Audio></Audio>
        </Menu.Item>
        <Menu.Item key="login" className="float-right">
          <Login></Login>
        </Menu.Item>

      </Menu>
    );
  }
}
export default Header;
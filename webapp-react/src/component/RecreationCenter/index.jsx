import React from 'react'
import { Menu, Icon } from 'antd';
import { BrowserRouter as Router,Link, Switch } from 'react-router-dom';
import {FrontendAuth1} from '../../router/FrontendAuth'
import {primaryRouterConfig} from '../../router/router.config.jsx'
import '../../style/App.scss'


export class recreationCenter extends React.Component {
  state = {
    mode: 'inline',
    theme: 'light',
  };

  render() {
    return <div id="recreation_center">
      <Router>
        <div>
          <Menu
            style={{ width: "100%" }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={this.state.mode}
            theme={this.state.theme}
          >
            <Menu.Item key="music">
              <Link to={`/recreationCenter/music`}>
                <Icon type="customer-service" theme="filled" />音乐播放器</Link>
            </Menu.Item>
            <Menu.Item key="video">
              <Link to={`/recreationCenter/video`}>
                <Icon type="video-camera" />视频播放器</Link>
            </Menu.Item>

          </Menu>
        </div>
        <div>
          <Switch>
            <FrontendAuth1 config={primaryRouterConfig}></FrontendAuth1>
          </Switch>
        </div>
      </Router>
    </div>
  }
}


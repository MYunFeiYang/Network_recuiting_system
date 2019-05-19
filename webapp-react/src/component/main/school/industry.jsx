import React from 'react'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import '../../../style/App.scss'

class Industry extends React.Component {
  constructor() {
    super();
    this.state = {
      theme: 'light',
      current: '1',
      mode:"inline"
    }
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  componentWillMount(){
    const clientWidth=document.body.clientWidth ;
    if(clientWidth<768){
      this.setState({
        mode:"horizontal"
      })
    }
  }
  render() {
    return (<Menu
      theme={this.state.theme}
      onClick={this.handleClick}
      defaultOpenKeys={['sub1']}
      selectedKeys={[this.state.current]}
      mode={this.state.mode}      >
      {
        this.props.industry.map((value, index) => {
          return <Menu.Item key={index} >
            {value.text}
          </Menu.Item>
        })
      }
    </Menu>)
  }
}
export default connect((state) => ({
  ...state
}))(Industry);
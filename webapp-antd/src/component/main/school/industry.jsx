import React from 'react'
import { connect } from 'react-redux';
import { Menu } from 'antd';

class Industry extends React.Component{
    constructor() {
        super();
        this.state = {
          theme: 'dark',
          current: '1',
        }
      }
      handleClick = (e) => {
        this.setState({
          current: e.key,
        });
      }
      render(){
        return (<div onClick={this.props.getPosition}><Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ width: '100%', textAlign: 'center' }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="inline">
            {
                this.props.industry.map((value, index) => {
                    return <Menu.Item key={index} style={{ height: '24px', lineHeight: '24px' }}>
                        {value.text}
                    </Menu.Item>
                })
            }
        </Menu>
        </div>)
      }
}
export default connect((state) => ({
    ...state
}))(Industry);
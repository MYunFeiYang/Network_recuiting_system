import React from 'react'
import { connect } from 'react-redux';
import { Menu } from 'antd';

class Position extends React.Component{
    constructor() {
        super();
        this.state = {
          theme: 'light',
          current: '1',
        }
      }
      handleClick = (e) => {
        this.setState({
          current: e.key,
        });
      }
      render(){
        return (<div onClick={this.props.paginate}>
          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{ textAlign: 'center' }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="horizontal">
            {
                this.props.position.map((value, index) => {
                    return <Menu.Item key={index} style={{ height: '24px', lineHeight: '24px' }}>
                        <span data-paging-type='position'>{value.position}</span>
                    </Menu.Item>
                })
            }
        </Menu>
        </div>)
      }
}
export default connect((state) => ({
    ...state
}))(Position);
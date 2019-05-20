import React from 'react'
import { Collapse, Icon } from 'antd'
import { connect } from 'react-redux'
import '../../style/App.scss'

const Panel = Collapse.Panel;


class JobRecommendation extends React.Component {
  render() {
    return <Collapse
      bordered={false}
      defaultActiveKey={['0']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
    >{
        this.props.job.map((value, index) => {
          return <Panel header={value.position + "———" + value.name} key={index} >
            <p><span>所在城市：</span>{value.address}</p>
            <p><span>发布时间：</span>{value.publish_time}</p>
            <p><span>有效期至：</span>{value.effective_time}</p>
            <p><span>招聘人数：</span>{value.number}</p>
            <p><span>所属行业：</span>{value.industry}</p>
            <p><span>最低薪资：</span>{value.min_salary}</p>
            <p><span>最高薪资：</span>{value.max_salary}</p>
            <p><span>通信邮箱：</span>{value.email}</p>
            <p><span>联系电话：</span>{value.telephone}</p>
          </Panel>
        })
      }

    </Collapse>
  }
}

export default connect((state) => ({
  ...state
}))(JobRecommendation)
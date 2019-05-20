import React from 'react'
import { Collapse, Icon } from 'antd'
import { connect } from 'react-redux'
import '../../style/App.scss'

const Panel = Collapse.Panel;


class ResumeRecommendation extends React.Component {
  render() {
    return <Collapse
      bordered={false}
      defaultActiveKey={['0']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
    >{
        this.props.resume.map((value, index) => {
          return <Panel header={value.career_objective + "———" + value.name} key={index} >
            <p><span>期望城市：</span>{value.expected_city}</p>
            <p><span>毕业院校：</span>{value.collage}</p>
            <p><span>最高学历：</span>{value.degree}</p>
            <p><span>专业：</span>{value.specialty}</p>
            <p><span>入学时间：</span>{value.admission_data}</p>
            <p><span>毕业时间：</span>{value.graduation_data}</p>
            <p><span>期望最低薪资：</span>{value.min_salary}</p>
            <p><span>期望最高薪资：</span>{value.max_salary}</p>
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
}))(ResumeRecommendation)
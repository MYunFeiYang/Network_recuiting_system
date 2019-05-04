import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Pagination, Table } from 'antd';

class Paging extends React.Component {
  render() {
    const columns = [{
      title: '工作地点',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '发布时间',
      dataIndex: 'time',
      key: 'time',
    }];
    return <Fragment>
      <Table columns={columns} dataSource={this.props.paging[0].list}
        size="small" pagination={false} rowKey="key"
        expandedRowRender={record => <p style={{ margin: 0 }}>{record.position}</p>} />
      <Pagination defaultCurrent={this.props.paging[0].pageNum}
        total={this.props.paging[0].totalPage} onChange={this.props.paginate}
        hideOnSinglePage={true} style={{float:"right"}}/>
    </Fragment>

  }
}
export default connect((state) => ({
  ...state
}))(Paging);
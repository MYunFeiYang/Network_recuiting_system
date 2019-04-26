import React from 'react'
import {
  Table, Input, Button, Popconfirm, Form,
} from 'antd';
import { connect } from 'react-redux';
import actions from '../../redux/actions'
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = (e) => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class AdminPower extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户名',
      dataIndex: 'nickname',
      width: '30%',
      editable: true,
    }, {
      title: '密码',
      dataIndex: 'password',
      editable: true,
    }, {
      title: '权限',
      dataIndex: 'power',
      editable: true,
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        this.props.admin.length >= 1
          ? (
            <Popconfirm title="确定删除该管理员吗?" onConfirm={() => this.handleDelete(record.key)}>
              <Button>删除</Button>
            </Popconfirm>
          ) : null
      ),
    }];
  }

  handleDelete = (key) => {
    const dataSource = this.props.admin;
    this.props.setAdminInformation(dataSource.filter(item => item.key !== key));
  }

  handleAdd = () => {
    const dataSource = this.props.admin
    const count=dataSource.length;
    const newData = {
      key: count,
      nickname: `*****`,
      password: '****',
      power: `****`,
    };
    this.setState({
      count: count + 1,
    });
    this.props.setAdminInformation([...dataSource, newData]);
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.props.setAdminInformation(newData);
  }
  componentDidMount(){
    const count = this.props.admin.length;
    this.setState({
      count,
    })
  }
  render() {
    const dataSource = this.props.admin;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
          </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered 
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default connect((state) => ({
  ...state
}), actions)(AdminPower)

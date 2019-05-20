import React, { Fragment } from 'react';
import { Table, Input, Button, Divider, Form, } from 'antd';
import { connect } from 'react-redux';
import actios from '../../redux/actions';
import axios from 'axios';
import qs from 'qs';
import { messageNotification } from '../../util'

const path = 'http://localhost'
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
class ManageJob extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '公司名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '所在城市',
                dataIndex: 'address',
                key: 'address',
                editable: true,
            }, {
                title: '行业',
                dataIndex: 'industry',
                key: 'industry',
            }, {
                title: '岗位',
                dataIndex: 'position',
                key: 'position',
            }, {
                title: '人数',
                dataIndex: 'number',
                key: 'number',
                editable: true,
            }, {
                title: '最低薪资',
                dataIndex: 'min_salary',
                key: 'min_salary',
                editable: true,
            }, {
                title: '最高薪资',
                dataIndex: 'max_salary',
                key: 'max_salary',
                editable: true,
            }, {
                title: '发布时间',
                dataIndex: 'publish_time',
                key: 'publish_time',
            }, {
                title: '有效期至',
                dataIndex: 'effective_time',
                key: 'effective_time',
                editable: true,
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Button onClick={() => {
                            this.modifyJob(record);
                        }}>保存</Button>
                        <Divider type="vertical" />
                        <Button onClick={() => {
                            this.handleDelete(record.identification);
                        }}>删除</Button>
                    </Fragment >
                ),
            }]
        }
    }
    handleDelete = (key) => {
        const dataSource = this.props.job;
        this.props.setJobInformation(dataSource.filter(item => item.identification !== key));
        this.deleteJob(key)
    }
    handleSave = (row) => {
        const newData = [...this.props.job];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.props.setJobInformation(newData);
    }
    modifyJob = (record) => {
        const { identification, number, min_salary, max_salary, effective_time, address } = record;
        axios({
            url: `${path}/enterprise?enterprise=modifyJob`,
            method: 'post',
            data: qs.stringify({ identification, number, min_salary, max_salary, effective_time, address }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'modify_job_success') {
                messageNotification("岗位管理", "岗位已修改成功");
            }
        }).catch((err) => {

        })
    }
    deleteJob = (identification) => {

        axios({
            url: `${path}/enterprise?enterprise=deleteJob`,
            method: 'post',
            data: qs.stringify({ identification }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'delete_job_success') {
                messageNotification("岗位管理", "岗位已删除成功")
            }
        }).catch((err) => {

        })
    }
    render() {

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.state.columns.map((col) => {
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
        return <Table components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={this.props.job}
            columns={columns}
        />;
    }
}
export default connect((state) => ({
    ...state
}), actios)(ManageJob);
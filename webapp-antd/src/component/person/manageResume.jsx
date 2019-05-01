import React, { Fragment } from 'react';
import { Table, Input, Button, Divider, Form, } from 'antd';
import { connect } from 'react-redux';
import actios from '../../redux/actions/';
import axios from 'axios';
import qs from 'qs';
import { modifyResumeSuccess, deleteResumeSuccess } from '../../util'

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
class ManageResume extends React.Component {
    constructor() {
        super();
        this.state = {
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                editable: true,
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
                editable: true,
            }, {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                editable: true,
            }, {
                title: '学校',
                dataIndex: 'collage',
                key: 'collage',
                editable: true,
            }, {
                title: '专业',
                dataIndex: 'specialty',
                key: 'specialty',
                editable: true,
            }, {
                title: '学历',
                dataIndex: 'degree',
                key: 'degree',
                editable: true,
            }, {
                title: '籍贯',
                dataIndex: 'origin',
                key: 'origin',
                editable: true,
            }, {
                title: '入学时间',
                dataIndex: 'admission_data',
                key: 'admission_data',
                editable: true,
            }, {
                title: '毕业时间',
                dataIndex: 'graduation_data',
                key: 'graduation_data',
                editable: true,
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Button onClick={() => {
                            this.modifyResume(record);
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
        const dataSource = this.props.resume;
        this.props.setResumeInformation(dataSource.filter(item => item.identification !== key));
        this.deleteResume(key)
    }
    handleSave = (row) => {
        const newData = [...this.props.resume];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.props.setResumeInformation(newData);
    }
    modifyResume = (record) => {
        const { identification, age, collage, specialty, degree, admission_data,
            graduation_data } = record;
        axios({
            url: `${path}/person?person=modifyResume`,
            method: 'post',
            data: qs.stringify({
                identification, age, collage, specialty, degree, admission_data,
                graduation_data
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'modify_resume_success') {
                modifyResumeSuccess();
            }
        }).catch((err) => {

        })
    }
    deleteResume = (identification) => {

        axios({
            url: `${path}/person?person=deleteResume`,
            method: 'post',
            data: qs.stringify({ identification }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }).then((responese) => {
            if (responese.data.msg === 'delete_resume_success') {
                deleteResumeSuccess()
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
            dataSource={this.props.resume}
            columns={columns}
            rowKey="identification" />;
    }
}
export default connect((state) => ({
    ...state
}), actios)(ManageResume);
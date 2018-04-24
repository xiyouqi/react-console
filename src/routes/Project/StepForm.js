import React, { PureComponent, Fragment } from 'react';
import { Button, Modal, message, Form, Input, Row, Col, Checkbox, Table, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';

import styles from './StepForm.less';

const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  '资产类别失效不允许转资',
  '资产地点失效不允许转资',
  '资产费用账户失效不允许转资',
  '负数资产不允许转资',
  '逾龄资产失效不允许转资',
  '资产账簿与资产类别不一致不允许转资',
  '在建项目账户不带工程段不允许转资',
  '未统一维护工程物资的物料不能形成资产',
  '未统一维护工程物资的物料不能转资',
  '不允许手工新增资产',
  '按资产数量分摊',
  '按资产价值分摊',
  '转资确认由项目经理完成',
  '资产模型增加按采购成本控制资产区间',
  '未统一维护工程物资的物料不能形成资产',
  '未统一维护工程物资的物料不能转资',
];
const defaultCheckedList = [
  '资产类别失效不允许转资',
  '资产地点失效不允许转资',
  '资产费用账户失效不允许转资',
  '负数资产不允许转资',
  '逾龄资产失效不允许转资',
  '资产账簿与资产类别不一致不允许转资',
  '在建项目账户不带工程段不允许转资',
  '按资产数量分摊',
];
const data = [];
for (let i = 0; i < 100; i += 1) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    ) : (
      value
    )}
  </div>
);
@Form.create()
export default class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        render: (text, record) => this.renderColumns(text, record, 'name'),
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'age'),
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        render: (text, record) => this.renderColumns(text, record, 'address'),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>编辑</a>
              )}
            </div>
          );
        },
      },
    ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }

  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  onChange = checkedList => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = e => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  render() {
    const { modalVisible, form, handleAdd, handleModalVisible, current, dispatch } = this.props;
    const onFinish = () => {
      dispatch(routerRedux.push('/form/step-form'));
    };
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };

    const stepFirst = (
      <div>
        <div
          style={{ borderBottom: '1px solid #E9E9E9', paddingBottom: 8 }}
          className={styles.steps}
        >
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            选择全部
          </Checkbox>
        </div>
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
      </div>
    );

    const stepSecond = <Table bordered dataSource={this.state.data} columns={this.columns} />;

    const stepThird = (
      <div className={styles.information}>
        <Row>
          <Col span={8} className={styles.label}>
            付款账户：
          </Col>
          <Col span={16}>{data.payAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            收款账户：
          </Col>
          <Col span={16}>{data.receiverAccount}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col span={16}>{data.receiverName}</Col>
        </Row>
        <Row>
          <Col span={8} className={styles.label}>
            转账金额：
          </Col>
          <Col span={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
        <Fragment>
          <Button type="primary" onClick={onFinish}>
            再转一笔
          </Button>
          <Button>查看账单</Button>
        </Fragment>
      </div>
    );

    const steps = [
      {
        title: 'First',
        content: stepFirst,
      },
      {
        title: 'Second',
        content: stepSecond,
      },
      {
        title: 'Last',
        content: stepThird,
      },
    ];

    return (
      <Modal
        title="转资规则"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        style={{ width: 1000 }}
      >
        <div className="steps-content">{steps[1].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    );
  }
}

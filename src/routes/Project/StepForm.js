import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Button,
  Modal,
  message,
  Form,
  Input,
  Checkbox,
  Table,
  Popconfirm,
  Steps,
  Card,
  Badge,
} from 'antd';
import Result from 'components/Result';

import styles from './StepForm.less';

const { Step } = Steps;

const actions = (
  <Fragment>
    <Button type="primary">确认资产</Button>
    <Button>查看明细</Button>
    <Button>打 印</Button>
  </Fragment>
);
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
  '不允许手工新增资产',
  '按资产数量分摊',
  '按资产价值分摊',
  '转资确认由项目经理完成',
  '资产模型增加按采购成本控制资产区间',
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
    materielName: `物料 ${i}`,
    materielCode: `123444${i}`,
    number: `1${i}`,
    price: `11${i}`,
    total: `4000`,
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
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.rule,
}))
@Form.create()
export default class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '物料名称',
        dataIndex: 'materielName',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'materielName'),
      },
      {
        title: '物料编码',
        dataIndex: 'materielCode',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'materielCode'),
      },
      {
        title: '数量 (个)',
        dataIndex: 'number',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'number'),
      },
      {
        title: '单价 (元)',
        dataIndex: 'price',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'price'),
      },
      {
        title: '总计 (元)',
        dataIndex: 'total',
        width: '15%',
        render: (text, record) => this.renderColumns(text, record, 'total'),
      },
      {
        title: '操作',
        dataIndex: '操作',
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
    this.state = {
      data,
      current: 0,
      checkAll: false,
      checkedList: defaultCheckedList,
    };
    this.cacheData = data.map(item => ({ ...item }));
  }

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

  next(add) {
    this.setState({
      current: this.state.current + add,
    });
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
    const { list: { list }, modalVisible, handleModalVisible } = this.props;

    const stepFirst = (
      <div>
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
        />
        <div
          style={{ borderTop: '1px solid #E9E9E9', padding: '8px 0', marginTop: 8 }}
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
      </div>
    );

    const states = ['不可转资', '可转资', '待转资', '已转资'];
    const status = ['error', 'processing', 'default', 'success'];

    const columns = [
      {
        title: '资产标签号',
        dataIndex: 'as_code',
        render: (text, record) => this.renderColumns(text, record, 'as_code'),
      },
      {
        title: '名称',
        dataIndex: 'as_name',
        render: (text, record) => this.renderColumns(text, record, 'as_name'),
      },
      {
        title: '规格',
        dataIndex: 'as_format',
        render: (text, record) => this.renderColumns(text, record, 'as_format'),
      },
      {
        title: '数量',
        dataIndex: 'as_num',
        render: (text, record) => this.renderColumns(text, record, 'as_num'),
      },
      {
        title: '合同价值（元）',
        dataIndex: 'as_amount',
        render: (text, record) => this.renderColumns(text, record, 'as_amount'),
      },
      {
        title: '转资状态',
        dataIndex: 'cost_stock',
        render: (value) => (
          <span>
            <Badge status={status[value % 4]} text={states[value % 4]} />
          </span>
        ),
      },
      {
        title: '操作',
        dataIndex: '操作',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
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

    const stepSecond = <Table bordered dataSource={list} columns={columns} />;

    const columns2 = [
      {
        title: '资产标签号',
        dataIndex: 'as_code',
        render: (text, record) => this.renderColumns(text, record, 'as_code'),
      },
      {
        title: '名称',
        dataIndex: 'as_name',
        render: (text, record) => this.renderColumns(text, record, 'as_name'),
      },
      {
        title: '规格',
        dataIndex: 'as_format',
        render: (text, record) => this.renderColumns(text, record, 'as_format'),
      },
      {
        title: '数量',
        dataIndex: 'as_num',
        render: (text, record) => this.renderColumns(text, record, 'as_num'),
      },
      {
        title: '合同价值（元）',
        dataIndex: 'as_amount',
        render: (text, record) => this.renderColumns(text, record, 'as_amount'),
      },
      {
        title: '操作',
        dataIndex: '操作',
        render: () => {
          return (
            <div className="editable-row-operations">
              <a>签收</a>
            </div>
          );
        },
      },
    ];

    const stepThird = <Table bordered dataSource={list} columns={columns2} rowSelection={{ columnWidth: 20 }} />;

    const columns3 = [
      {
        title: '资产标签号',
        dataIndex: 'as_code',
        render: (text, record) => this.renderColumns(text, record, 'as_code'),
      },
      {
        title: '名称',
        dataIndex: 'as_name',
        render: (text, record) => this.renderColumns(text, record, 'as_name'),
      },
      {
        title: '规格',
        dataIndex: 'as_format',
        render: (text, record) => this.renderColumns(text, record, 'as_format'),
      },
      {
        title: '数量',
        dataIndex: 'as_num',
        render: (text, record) => this.renderColumns(text, record, 'as_num'),
      },
      {
        title: '合同价值（元）',
        dataIndex: 'as_amount',
        render: (text, record) => this.renderColumns(text, record, 'as_amount'),
      },
      {
        title: '分摊价值（元）',
        dataIndex: 'as_share_expense',
        render: (text, record) => this.renderColumns(text, record, 'as_share_expense'),
      },
      {
        title: '操作',
        dataIndex: '操作',
        render: () => {
          return (
            <div className="editable-row-operations">
              <a>分摊</a>
            </div>
          );
        },
      },
    ];

    const step3 = <Table bordered dataSource={list} columns={columns3} rowSelection={{ columnWidth: 20 }} />;

    const stepLast = (
      <div>
        <Card bordered={false}>
          <Result
            type="success"
            title="费用分摊完成"
            description="请确认完成转资。"
            actions={actions}
            style={{ width: '100%' }}
            rowKey="materielName"
          />
        </Card>
      </div>
    );

    const steps = [
      {
        title: '1',
        content: stepFirst,
      },
      {
        title: '2',
        content: stepSecond,
      },
      {
        title: '3',
        content:  stepThird,
      },
      {
        title: '4',
        content:  step3,
      },
      {
        title: '5',
        content: stepLast,
      },
    ];

    const modalFooter = (
      <div>
        {this.state.current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => this.next(-1)}>
            上一步
          </Button>
        )}
        {this.state.current < steps.length - 1 && (
          <Button type="primary" onClick={() => this.next(1)}>
            下一步
          </Button>
        )}
        {this.state.current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('完成!')}>
            完成
          </Button>
        )}
        <Button style={{ marginLeft: 8 }} onClick={() => handleModalVisible()}>
          取消
        </Button>
      </div>
    );

    return (
      <Modal
        title="转资申请"
        visible={modalVisible}
        width={1000}
        onCancel={() => handleModalVisible()}
        footer={modalFooter}
      >
        <Steps current={this.state.current} className={styles.steps}>
          <Step title="资产生成" />
          <Step title="资产维护" />
          <Step title="资产签收" />
          <Step title="费用分摊" />
          <Step title="转资确认" />
          <Step title="完成" />
        </Steps>
        <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
      </Modal>
    );
  }
}

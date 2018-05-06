import React, { PureComponent, Fragment } from 'react';
import {
  Button,
  Modal,
  message,
  Form,
  Input,
  // Checkbox,
  Table,
  Popconfirm,
  Steps,
  Card,
  Select,
} from 'antd';
import Result from 'components/Result';

import styles from './StepForm.less';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const extra = (
  <Fragment>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>发起审批</span>} />
      <Step title={<span style={{ fontSize: 14 }}>项目审批</span>} />
      <Step title={<span style={{ fontSize: 14 }}>工作组审批</span>} />
      <Step title={<span style={{ fontSize: 14 }}>完成</span>} />
    </Steps>
  </Fragment>
);

const actions = (
  <Fragment>
    <Button type="primary">返回列表</Button>
    <Button>查看审批记录</Button>
  </Fragment>
);

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
    };
    this.cacheData = data.map(item => ({ ...item }));
  }

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
    const { modalVisible, handleModalVisible } = this.props;

    const stepFirst = (
      <div>
        <Input placeholder="后评估标题" />
        <Select
          className={styles.slectRight}
          placeholder="部门"
          onChange={this.handleFormSubmit}
          style={{ width: 180, marginLeft: 16 }}
        >
          <Option value="1">网络部</Option>
          <Option value="2">政企客户部</Option>
          <Option value="3">网络管理中心</Option>
          <Option value="4">市场部</Option>
        </Select>
        <TextArea rows={4} placeholder="后评估发起申请" />
      </div>
    );

    const stepSecond = <Table bordered dataSource={this.state.data} columns={this.columns} />;
    const stepThird = <Table bordered dataSource={this.state.data} columns={this.columns} />;
    const stepLast = (
      <div>
        <Card bordered={false}>
          <Result
            type="success"
            title="提交成功"
            description="已提交 ERP 系统，请等待。"
            extra={extra}
            actions={actions}
            style={{ width: '100%' }}
            rowKey="materielName"
          />
        </Card>
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
        title: 'Third',
        content: stepThird,
      },
      {
        title: 'Last',
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
        title="后评估发起"
        visible={modalVisible}
        width={1000}
        onCancel={() => handleModalVisible()}
        footer={modalFooter}
      >
        <Steps current={this.state.current} className={styles.steps}>
          <Step title="发起" />
          <Step title="选定项目" />
          <Step title="组建工作组" />
          <Step title="计划部审批" />
          <Step title="完成" />
        </Steps>
        <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
      </Modal>
    );
  }
}

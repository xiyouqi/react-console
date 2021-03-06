import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Button,
  Modal,
  message,
  Form,
  Input,
  // Checkbox,
  Table,
  // Popconfirm,
  Steps,
  Card,
  Select,
} from 'antd';
import Result from 'components/Result';
import styles from './StepForm.less';

const { Step } = Steps;
const { TextArea, Search } = Input;
const { Option } = Select;

const extra = (
  <Fragment>
    <Steps style={{ marginLeft: -42, width: 'calc(100% + 84px)' }} progressDot current={0}>
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

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'title',
        key: 'id',
      },
      {
        title: '项目分类',
        dataIndex: 'type',
      },
      {
        title: '试运行时间',
        render: () => '2017-06-06',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '初步竣工验收完成时间',
        render: () => '2017-12-06',
        sorter: (a, b) => a.age - b.age,
      },
    ];
    this.state = {
      current: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
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

  render() {
    const { list: { list }, modalVisible, handleModalVisible } = this.props;
    const formItemStyle = {
      marginBottom: 16,
    };
    const stepFirst = (
      <div>
        <Input placeholder="后评估说明" style={formItemStyle} />
        <Select
          className={styles.slectRight}
          placeholder="部门"
          onChange={this.handleFormSubmit}
          style={{ width: '100%', ...formItemStyle }}
        >
          <Option value="1">网络部</Option>
          <Option value="2">政企客户部</Option>
          <Option value="3">网络管理中心</Option>
          <Option value="4">市场部</Option>
        </Select>
        <TextArea rows={6} placeholder="后评估发起申请" style={formItemStyle} />
      </div>
    );

    const stepSecond = (
      <div>
        <div className={styles.extraContent} style={{ marginBottom: 16, textAlign: 'right' }}>
          <Search style={{ width: 240 }} placeholder="请输入项目名称或编号" onSearch={() => ({})} />
        </div>
        <Table
          bordered
          dataSource={list}
          columns={this.columns}
          rowSelection={{ columnWidth: 20, type: 'radio' }}
          rowKey="id"
          size="small"
        />
      </div>
    );

    const orgs = {
      移动通信网: '网络部',
      传输网: '网络部',
      集客接入: '政企客户部',
      业务网: '政企客户部',
      支撑网网管系统: '网络管理中心',
      业务支撑系统: '业务支撑中心',
      信息化系统和信息安全系统: '网络与信息安全管理部',
      局房土建及动力配套: '市场部',
    };

    const teamColumns = [
      {
        title: '姓名',
        dataIndex: 'owner',
      },
      {
        title: '部门',
        dataIndex: 'type',
        render: value => orgs[value],
      },
      {
        title: '角色',
        render: () => '主任',
      },
    ];

    const stepThird = (
      <div>
        <div className={styles.extraContent} style={{ marginBottom: 16, textAlign: 'right' }}>
          <Select
            className={styles.slectRight}
            placeholder="部门"
            style={{ width: 180, marginRight: 16 }}
          >
            <Option value="1">网络部</Option>
            <Option value="2">政企客户部</Option>
            <Option value="3">网络管理中心</Option>
            <Option value="4">市场部</Option>
          </Select>
          <Search style={{ width: 240 }} placeholder="请输入项目名称或编号" onSearch={() => ({})} />
        </div>
        <Table
          bordered
          dataSource={list}
          columns={teamColumns}
          rowSelection={{ columnWidth: 20 }}
          rowKey="id"
          size="small"
        />
      </div>
    );
    const stepLast = (
      <div>
        <Card bordered={false}>
          <Result
            type="success"
            title="提交成功"
            description="已提交计划部审核，请等待。"
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
        title="后评估准备"
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

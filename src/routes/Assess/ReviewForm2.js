import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import {
  Button,
  Modal,
  message,
  Form,
  Input,
  Steps,
  Card,
  Select,
  Radio,
  DatePicker,
} from 'antd';
import Result from 'components/Result';
import styles from './StepForm.less';

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const { RadioGroup } = Radio;

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
export default class ReviewForm extends PureComponent {
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
    const { modalVisible, handleModalVisible } = this.props;
    const formItemStyle = {
      marginBottom: 16,
    };
    const stepFirst = (
      <div>
        <Input placeholder="部门评审标题" style={formItemStyle} />
        <Select
          className={styles.slectRight}
          placeholder="部门"
          style={{ width: '100%', ...formItemStyle }}
        >
          <Option value="1">网络部</Option>
          <Option value="2">政企客户部</Option>
          <Option value="3">网络管理中心</Option>
          <Option value="4">市场部</Option>
        </Select>
        <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} format="YYYY/MM/DD"  style={formItemStyle} placeholder="评审日期" />
        <RadioGroup onChange={this.onChange} value={this.state.value} style={formItemStyle} >
          <Radio value={1}>通过</Radio>
          <Radio value={2}>退回</Radio>
        </RadioGroup>
        <TextArea rows={6} placeholder="部门评审意见" style={formItemStyle} />
      </div>
    );

    const stepSecond = (
      <div>
        <Input placeholder="决策会评审标题" style={formItemStyle} />
        <DatePicker defaultValue={moment('2015/01/01', 'YYYY/MM/DD')} format="YYYY/MM/DD"  style={formItemStyle} placeholder="评审日期" />
        <RadioGroup onChange={this.onChange} value={this.state.value} style={formItemStyle} >
          <Radio value={1}>通过</Radio>
          <Radio value={2}>退回</Radio>
        </RadioGroup>
        <TextArea rows={6} placeholder="决策会评审意见" style={formItemStyle} />
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
        title="后评估评审"
        visible={modalVisible}
        width={1000}
        onCancel={() => handleModalVisible()}
        footer={modalFooter}
      >
        <Steps current={this.state.current} className={styles.steps}>
          <Step title="部门评审" />
          <Step title="决策会评审" />
          <Step title="评审完成" />
        </Steps>
        <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
      </Modal>
    );
  }
}

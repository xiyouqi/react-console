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
  List,
  Avatar,
  Tag,
} from 'antd';
import Result from 'components/Result';
import EditableCell from './EditableCell';
import styles from './StepForm.less';

const { Step } = Steps;
const { Search } = Input;

const actions = (
  <Fragment>
    <Button type="primary">返回列表</Button>
    <Button>查看记录</Button>
  </Fragment>
);

@Form.create()
@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class ReadyForm extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '指标代码',
        dataIndex: 'kpi_code',
        key: 'kpi_code',
      },
      {
        title: '一级指标名称',
        dataIndex: 'kpi_level1',
      },
      {
        title: '二级指标名称',
        dataIndex: 'kpi_level2',
      },
      {
        title: '三级指标名称',
        dataIndex: 'kpi_level3',
      },
      {
        title: '指标说明',
        dataIndex: 'kpi_caption',
        width: '40%',
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
        count: 10,
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

    const stepFirst = (
      <div>
        <div className={styles.extraContent} style={{ marginBottom: 16, textAlign: 'right' }}>
          <Search style={{ width: 240 }} placeholder="请输入指标名称或编码" onSearch={() => ({})} />
          <Button icon="arrow-up" type="primary" style={{ marginLeft: 16 }}>
            导入
          </Button>
          <Button icon="delete" style={{ marginLeft: 16 }}>
            删除
          </Button>
        </div>
        <Table
          bordered
          dataSource={list}
          columns={this.columns}
          rowSelection={{ columnWidth: 20 }}
          rowKey="id"
          size="small"
        />
      </div>
    );

    const editColumns = [
      {
        title: '指标代码',
        dataIndex: 'kpi_code',
        key: 'kpi_code',
      },
      {
        title: '一级指标名称',
        dataIndex: 'kpi_level1',
      },
      {
        title: '二级指标名称',
        dataIndex: 'kpi_level2',
      },
      {
        title: '三级指标名称',
        dataIndex: 'kpi_level3',
      },
      {
        title: '权重',
        width: 150,
        dataIndex: 'like',
        render: (text = 0) => <EditableCell value={text} />,
      },
      {
        title: '权重系数',
        width: 150,
        dataIndex: 'newUser',
        render: (text = 0) => <EditableCell value={text} />,
      },
      {
        title: '档次标准',
        width: 150,
        dataIndex: 'star',
        render: (text = 0) => <EditableCell value={text} />,
      },
    ];

    const stepSecond = (
      <div>
        <Table bordered dataSource={list} columns={editColumns} rowKey="id" size="small" />
      </div>
    );

    const stepThird = (
      <div>
        <div className={styles.extraContent} style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button icon="arrow-up" type="primary" style={{ marginLeft: 16 }}>
            上传
          </Button>
        </div>
        <List
          size="large"
          rowKey="id"
          loading={this.props.loading}
          dataSource={list}
          renderItem={item => (
            <List.Item actions={[<a>编辑</a>]}>
              <List.Item.Meta
                avatar={<Avatar src={item.doc_icon} shape="square" size="large" />}
                title={<a href={item.href}>{item.doc_title}</a>}
                description={item.subDescription}
              />
              <div className={styles.projectTag}>
                {item.doc_tag.split(',').map(tag => <Tag>{tag}</Tag>)}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
    const stepLast = (
      <div>
        <Card bordered={false}>
          <Result
            type="success"
            title="提交成功"
            description="初步评估完成，进入评审阶段。"
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
        title="后评估编制"
        visible={modalVisible}
        width={1000}
        onCancel={() => handleModalVisible()}
        footer={modalFooter}
      >
        <Steps current={this.state.current} className={styles.steps}>
          <Step title="建立指标体系" />
          <Step title="设定评估依据" />
          <Step title="基础数据收集" />
          <Step title="初步评估" />
          <Step title="准备完成" />
        </Steps>
        <div className={styles.stepsContent}>{steps[this.state.current].content}</div>
      </Modal>
    );
  }
}

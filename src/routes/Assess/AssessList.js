import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Avatar, Button, Badge, Select } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StepForm from './StepForm';
import ReadyForm from './ReadyForm';
import styles from './AssessList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const { Option } = Select;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class ProjectList extends PureComponent {
  state = {
    modalVisible: false,
    modalReadyVisible: false,
    current: 0,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 10,
      },
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalReadyVisible = flag => {
    this.setState({
      modalReadyVisible: !!flag,
    });
  };

  render() {
    const { list: { list }, loading } = this.props;
    const { current, modalVisible } = this.state;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">发起</RadioButton>
          <RadioButton value="waiting">准备</RadioButton>
          <RadioButton value="progress">评审</RadioButton>
          <RadioButton value="waiting">总结</RadioButton>
        </RadioGroup>
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
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入项目名称"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const states = [
      '发起',
      '选定项目',
      '组建工作组',
      '计划部审批',
      '关闭',
      '审批退回',
      '建立指标体系',
      '设定评估依据',
      '基础数据收集',
      '初步评估',
      '部门评审',
      '决策会评审',
      '结果发布',
    ];
    const status = [
      'processing',
      'processing',
      'processing',
      'success',
      'error',
      'warning',
      'processing',
      'processing',
      'processing',
      'success',
      'success',
      'success',
      'success',
    ];

    const ListContent = ({ data: { count = Math.ceil(Math.random() * 12) } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem} style={{ width: 100 }}>
          <p>
            <Badge status={status[count]} text={states[count]} />
          </p>
        </div>
      </div>
    );

    const UploadBtn = (
      <div>
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          发起项目后评估
        </Button>
        <Button
          icon="plus"
          type="primary"
          onClick={() => this.handleModalReadyVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          编制项目后评估
        </Button>
      </div>
    );

    const actions = [
      '选定项目',
      '组建工作组',
      '审批',
      '建立指标体系',
      '',
      '组建工作组',
      '设定评估依据',
      '基础数据收集',
      '初步评估',
      '部门评审',
      '决策会评审',
      '结果发布',
      '',
    ];

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

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
      current,
    };

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={6} xs={24}>
                <Info title="发起" value="10" bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="准备" value="8" bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="评审" value="2" bordered />
              </Col>
              <Col sm={6} xs={24}>
                <Info title="总结" value="24" />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title={UploadBtn}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item, count = Math.ceil(Math.random() * 12)) => (
                <List.Item actions={[<a>编辑</a>, <a>{actions[count]}</a>]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<Link to={`/projects/${item.id}`}>{orgs[item.type]}</Link>}
                    description={`${item.type} ${count > 0 ? `/ ${item.title}` : ''}`}
                  />
                  <ListContent data={{ count, ...item }} />
                </List.Item>
              )}
            />
          </Card>
        </div>
        <StepForm {...parentMethods} modalVisible={modalVisible} />
        <ReadyForm
          {...{ handleModalVisible: this.handleModalReadyVisible }}
          modalVisible={this.state.modalReadyVisible}
        />
      </PageHeaderLayout>
    );
  }
}

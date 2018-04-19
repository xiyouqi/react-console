import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table, Badge } from 'antd';
import DescriptionList from 'components/DescriptionList';
import styles from './ProjectInfo.less';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: '合同名称',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '供应商名称',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '签署部门',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '签订日期',
    dataIndex: 'cost',
    key: 'cost',
  },
];
@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class ProjectInfo extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      goodsData = basicGoods.concat({});
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '项目阶段',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '项目负责部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '项目负责人',
        dataIndex: 'name',
        key: 'name',
        render: renderContent,
      },
      {
        title: '其他成员',
        dataIndex: 'other',
        key: 'other',
        render: renderContent,
      },
      {
        title: '开始时间',
        dataIndex: 'start',
        key: 'start',
        render: renderContent,
      },
      {
        title: '到期时间',
        dataIndex: 'end',
        key: 'end',
        render: renderContent,
      },
    ];
    return (
      <Card title="项目信息" style={{ marginBottom: 24 }} bordered={false}>
        <DescriptionList style={{ marginBottom: 24 }} title="基本信息">
          <Description term="项目名称">新疆移动2018年二期工程</Description>
          <Description term="项目编码">32943898021309809423</Description>
          <Description term="项目金额">3321万元</Description>
          <Description term="项目类型">建筑类</Description>
          <Description term="项目创建时间">2017-08-08</Description>
        </DescriptionList>
        <Divider style={{ marginBottom: 32 }} />
        <div className={styles.title}>项目执行情况</div>
        <Table
          style={{ marginBottom: 24 }}
          pagination={false}
          loading={loading}
          dataSource={goodsData}
          columns={goodsColumns}
          rowKey="id"
        />
        <div className={styles.title}>项目合同</div>
        <Table
          style={{ marginBottom: 16 }}
          pagination={false}
          loading={loading}
          dataSource={basicProgress}
          columns={progressColumns}
        />
      </Card>
    );
  }
}

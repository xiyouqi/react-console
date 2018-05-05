import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Table, Badge, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';
import styles from './ProjectInfo.less';

const { Description } = DescriptionList;

const contractColumns = [
  {
    title: '合同号',
    dataIndex: 'agreementNumber',
    key: 'agreementNumber',
  },
  {
    title: '合同编码',
    dataIndex: 'agreementCode',
  },
  {
    title: '合同类型',
    dataIndex: 'agreementType',
  },
  {
    title: '合同金额',
    dataIndex: 'agreementValue',
  },
  {
    title: '付款方式',
    dataIndex: 'payment',
  },
  {
    title: '交货期',
    dataIndex: 'deliveryDate',
  },
  {
    title: '经办人',
    dataIndex: 'operator',
  },
  {
    title: '部门名称',
    dataIndex: 'department',
  },
  {
    title: '银行信息',
    dataIndex: 'bankInfo',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: text =>
      text === 'success' ? (
        <Badge status="success" text="成功" />
      ) : (
        <Badge status="processing" text="进行中" />
      ),
  },
  {
    title: '签订日期',
    dataIndex: 'date',
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
    const { basicProgress } = profile;

    return (
      <div>
        <Card title="项目信息" style={{ marginBottom: 24 }} bordered={false}>
          <div className={styles.title}>基本信息</div>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="项目名称">新疆移动2018年二期工程</Description>
            <Description term="项目编码">32943898021309809423</Description>
            <Description term="项目金额">3321万元</Description>
            <Description term="项目类型">建筑类</Description>
            <Description term="项目创建时间">2017-08-08</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>项目合同</div>
          <div>
            <Button
              icon="plus"
              type="primary"
              onClick={() => this.handleModalVisible(true)}
              className={styles.uploadBtn}
              style={{ marginBottom: 24 }}
            >
              更新
            </Button>
          </div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={contractColumns}
            rowKey="agreementNumber"
          />
        </Card>
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table, Badge } from 'antd';

import styles from './ProjectContent.less';

const progressColumns = [
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
export default class VendorList extends PureComponent {
  state = {};
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicProgress } = profile;
    const expandedRowRender = () => {
      const columns = [
        { title: '计划', dataIndex: 'plan', key: 'plan' },
        { title: '进度', dataIndex: 'progress', key: 'progress' },
        {
          title: '状态',
          key: 'state',
          render: () => (
            <span>
              <Badge status="success" />进行中
            </span>
          ),
        },
        { title: '单位', dataIndex: 'department', key: 'department' },
        { title: '责任人', dataIndex: 'PersonLiable', key: 'PersonLiable' },
        { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
        { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
        // {
        //   title: 'Action',
        //   dataIndex: 'operation',
        //   key: 'operation',
        //   render: () => (
        //     <span className="table-operation">
        //       <a href="">Pause</a>
        //       <a href="">Stop</a>
        //       <Dropdown overlay={menu}>
        //         <a href="">
        //           More <Icon type="down" />
        //         </a>
        //       </Dropdown>
        //     </span>
        //   ),
        // },
      ];

      const data = [];
      for (let i = 0; i < 3; i += 1) {
        data.push({
          key: i,
          plan: '任务',
          progress: '76%',
          upgradeNum: 'Upgraded: 56',
          department: '单位1',
          PersonLiable: '三毛',
          startTime: '2018-02-24',
          endTime: '2019-04-24',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    const columns = [
      { title: '单点工程', dataIndex: 'name', key: 'name' },
      { title: '责任人', dataIndex: 'PersonLiable', key: 'PersonLiable' },
      { title: '设计单位', dataIndex: 'designUnit', key: 'designUnit' },
      { title: '施工单位', dataIndex: 'constructionUnit', key: 'constructionUnit' },
      { title: '监理单位', dataIndex: 'controlUnit', key: 'controlUnit' },
      // { title: '开始时间', key: 'operation', render: () => <a href="">Publish</a> },
      { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
      { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
      { title: '进度', dataIndex: 'progress', key: 'progress' },
      {
        title: '状态',
        key: 'status',
        render: () => (
          <span>
            <Badge status="success" />进行中
          </span>
        ),
      },
      { title: '质量', dataIndex: 'quality', key: 'quality' },
    ];

    const data = [];
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        name: '单点工程1',
        PersonLiable: '猴子',
        designUnit: '单位1',
        constructionUnit: '单位2',
        controlUnit: '单位3',
        startTime: '2018-02-24',
        endTime: '2019-04-24',
        progress: '87%',
        status: '进行中',
        quality: '',
      });
    }

    return (
      <div>
        <Card classNmae={styles.nestedTable}>
          <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={data} />
        </Card>
        <Card bordered={false} style={{ marginTop: 24 }}>
          <div className={styles.title}>项目合同</div>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
            rowKey="agreementNumber"
          />
        </Card>
      </div>
    );
  }
}

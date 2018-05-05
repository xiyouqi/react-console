import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Divider } from 'antd';

import styles from './ProjectContent.less';

@connect(({ list, profile, loading }) => ({
  list,
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
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list: { list } } = this.props;
    const expandedRowRender = () => {
      const columns = [
        { title: '定额编号', dataIndex: 'task_code', key: 'task_no' },
        { title: '工序', dataIndex: 'task' },
        { title: '单位', dataIndex: 'department', key: 'department' },
        { title: '责任人', dataIndex: 'PersonLiable', key: 'PersonLiable' },
        { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
        { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <span className="table-operation">
              <a href="">任务分解</a>
            </span>
          ),
        },
      ];

      return <Table columns={columns} dataSource={list} pagination={false} />;
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
      { title: '质量', dataIndex: 'quality', key: 'quality' },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="#">复制</a>
            <Divider type="vertical" />
            <a href="#">申请变更</a>
          </Fragment>
        ),
      },
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
        quality: '',
      });
    }
    return (
      <div>
        <Card classNmae={styles.nestedTable} title="工程定义">
          <div>
            <Button
              icon="plus"
              type="primary"
              onClick={() => this.handleModalVisible(true)}
              className={styles.uploadBtn}
            >
              创建
            </Button>
            <Button
              icon="arrow-up"
              onClick={() => this.handleModalVisible(true)}
              className={styles.uploadBtn}
            >
              导入
            </Button>
            <Button
              icon="edit"
              onClick={() => this.handleModalVisible(true)}
              className={styles.uploadBtn}
            >
              设计变更
            </Button>
          </div>
          <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={data} />
        </Card>
      </div>
    );
  }
}

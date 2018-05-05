import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Badge, Card, Divider, Progress } from 'antd';
import styles from './ProjectProgress.less';

@connect(({ list, rule, loading }) => ({
  list,
  rule,
  loading: loading.models.rule,
}))
export default class ProjectProgress extends PureComponent {
  state = {};
  componentDidMount() {
    this.props.dispatch({
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
        {
          title: '进度',
          render: () => (
            <span>
              <Progress
                percent={Math.floor(Math.random() * 100)}
                status={status}
                strokeWidth={6}
                style={{ width: 80 }}
              />
            </span>
          ),
        },
        {
          title: '状态',
          key: 'state',
          render: () => (
            <span>
              <Badge status="success" />进行中
            </span>
          ),
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <Fragment>
              <a href="#">进度管理</a>
              <Divider type="vertical" />
              <a href="#">任务验收</a>
            </Fragment>
          ),
        },
      ];

      return <Table columns={columns} dataSource={list} pagination={false} />;
    };
    const columns = [
      { title: '单点工程', dataIndex: 'name', key: 'name' },
      { title: '责任人', dataIndex: 'PersonLiable', key: 'PersonLiable' },
      // { title: '开始时间', key: 'operation', render: () => <a href="">Publish</a> },
      { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
      { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
      {
        title: '进度',
        render: () => (
          <span>
            <Progress
              percent={Math.floor(Math.random() * 100)}
              status={status}
              strokeWidth={6}
              style={{ width: 80 }}
            />
          </span>
        ),
      },
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
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="#">进度管理</a>
            <Divider type="vertical" />
            <a href="#">停工</a>
          </Fragment>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; i += 1) {
      data.push({
        key: i,
        name: `单点工程 ${i}`,
        PersonLiable: '林河',
        designUnit: '诺基亚',
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
      <Card classNmae={styles.nestedTable} title="工程进度">
        <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={data} />
      </Card>
    );
  }
}

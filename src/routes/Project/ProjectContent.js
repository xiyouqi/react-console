import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Table } from 'antd';

import styles from './ProjectContent.less';

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
export default class VendorList extends PureComponent {
  state = {};
  data = [
    {
      key: 1,
      name: '任务1',
      stage: '阶段1',
      startTime: '2018-06-08',
      endTime: '2018-08-08',
      description: '任务1描述信息。',
    },
    {
      key: 2,
      name: '任务2',
      stage: '阶段2',
      startTime: '2018-08-08',
      endTime: '2018-10-08',
      description: '任务2描述信息。',
    },
    {
      key: 3,
      name: '任务3',
      stage: '阶段3',
      startTime: '2018-10-08',
      endTime: '2018-12-08',
      description: '任务3描述信息。',
    },
  ];

  render() {
    const columns = [
      { title: '任务', dataIndex: 'name', key: 'name' },
      { title: '项目阶段', dataIndex: 'stage', key: 'stage' },
      { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
      { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => (
          <a href="" className={styles.deleteBtn}>
            删除
          </a>
        ),
      },
    ];

    return (
      <Card bordered={false} title="内容列表">
        <div className={styles.tableList}>
          <Table
            columns={columns}
            expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
            dataSource={this.data}
          />
        </div>
      </Card>
    );
  }
}

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
  

  render() {
    const columns = [{
      title: '任务',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '项目阶段',
      dataIndex: 'stage',
      key: 'stage',
      width: '12%',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      width: '30%',
      key: 'startTime',
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      width: '30%',
      key: 'endTime',
    }];
    const data = [{
      key: 1,
      name: '任务1',
      stage: '阶段1',
      startTime: '2018-06-08',
      endTime: '2019-06-08',
      children: [{
        key: 11,
        name: '子任务1',
        stage: '阶段1',
        startTime: '2018-06-08',
        endTime: '2018-08-08',
      }, {
        key: 12,
        name: '子任务2',
        stage: '阶段1',
        startTime: '2018-08-08',
        endTime: '2019-10-08',
        children: [{
          key: 121,
          name: '子任务3',
          stage: '阶段1',
          startTime: '2018-08-08',
          endTime: '2018-09-08',
        }],
      }, {
        key: 13,
        name: '子任务4',
        stage: '阶段1',
        startTime: '2018-10-08',
        endTime: '2019-12-08',
        children: [{
          key: 131,
          name: '子任务5',
          stage: '阶段1',
          startTime: '2018-10-08',
          endTime: '2018-11-08',
          children: [{
            key: 1311,
            name: '子任务6',
            stage: '阶段1',
            startTime: '2018-11-08',
            endTime: '2018-11-18',
          }, {
            key: 1312,
            name: '子任务7',
            stage: '阶段1',
            startTime: '2018-11-18',
            endTime: '2018-12-08',
          }],
        }],
      }],
    }, {
      key: 2,
      name: '任务2',
      stage: '阶段2',
      startTime: '2019-01-18',
      endTime: '2010-12-08',
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };

    return (
      <Card bordered={false} title="内容列表">
        <div className={styles.tableList}>
          <Table columns={columns} rowSelection={rowSelection} dataSource={data} />
        </div>
      </Card>
    );
  }
}

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Badge, Card } from 'antd';
import styles from './ProjectProgress.less';

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
export default class ProjectProgress extends PureComponent {
  state = {};

  render() {
    // const menu = (
    //   <Menu>
    //     <Menu.Item>
    //       Action 1
    //     </Menu.Item>
    //     <Menu.Item>
    //       Action 2
    //     </Menu.Item>
    //   </Menu>
    // );
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
      <Card classNmae={styles.nestedTable}>
        <Table columns={columns} expandedRowRender={expandedRowRender} dataSource={data} />
      </Card>
    );
  }
}

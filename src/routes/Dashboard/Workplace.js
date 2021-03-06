import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Table, Badge, Calendar, Radio } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './Workplace.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
// const TabPane = Tabs.TabPane;
// function callback(key) {
//   console.log(key);
// }
const getListData = value => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [{ type: 'warning', content: '任务1' }, { type: 'success', content: '任务2' }];
      break;
    case 10:
      listData = [
        { type: 'warning', content: '任务3' },
        { type: 'success', content: '任务4' },
        { type: 'error', content: '任务5' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: '任务3' },
        { type: 'success', content: '任务4' },
        { type: 'error', content: '任务5' },
        { type: 'warning', content: '任务1' },
        { type: 'success', content: '任务2' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = value => {
  if (value.month() === 8) {
    return 1394;
  }
};

const monthCellRender = value => {
  const num = getMonthData(value);
  return num ? (
    <div className={styles.notesMonth}>
      {/* <section>{num}</section>
      <span>Backlog number</span> */}
    </div>
  ) : null;
};

const dateCellRender = value => {
  const listData = getListData(value);
  return (
    <ul className={styles.events}>
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

@connect(({ list, activities, chart, loading }) => ({
  list,
  activities,
  chart,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
  loading: loading.effects['chart/fetch'],
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 6,
      },
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const { activities: { list } } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const { list: { list }, projectLoading, activitiesLoading, loading } = this.props;
    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="../src/assets/avatars/avatar-leia.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，猴子</div>
          <div>专注、坚持，成就更好的明天！</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p style={{ textAlign: 'center' }}>56</p>
        </div>
        <div className={styles.statItem}>
          <p>未完成任务</p>
          <p style={{ textAlign: 'center' }}>16</p>
        </div>
        <div className={styles.statItem}>
          <p>已完成任务</p>
          <p style={{ textAlign: 'center' }}>8</p>
        </div>
      </div>
    );
    const columns = [
      {
        title: '任务',
        dataIndex: 'task',
        key: 'task',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 60,
        align: 'center',
        render: text =>
          text === 'success' ? (
            <Badge status="success" text="成功" />
          ) : (
            <Badge status="processing" />
          ),
      },
    ];
    const extraTab = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">我的任务</RadioButton>
          <RadioButton value="progress">我的关注</RadioButton>
        </RadioGroup>
      </div>
    );

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/projects">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {list.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={item.href}>{item.title}</Link>
                        </div>
                      }
                    />

                    <div className={styles.projectItemContent}>
                      <DescriptionList className={styles.headerList} size="small" col="3">
                        <Badge status="processing" text="进行中" />
                      </DescriptionList>
                      {item.updatedAt && (
                        <span className={styles.datetime} title={item.updatedAt}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>

            <Card title="日历">
              <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="任务列表"
              style={{ marginBottom: 24 }}
              extra={extraTab}
              className={styles.taskList}
            >
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={list}
                rowSelection={{
                  selectedRowKeys: [],
                  onChange: () => {},
                }}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}

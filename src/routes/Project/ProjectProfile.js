import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Badge } from 'antd';
import DescriptionList from 'components/DescriptionList';
import { getRoutes } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './ProjectProfile.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">资产核查</Menu.Item>
    <Menu.Item key="2">审计</Menu.Item>
    <Menu.Item key="3">后评估</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>交维申请</Button>
      <Button>审计申请</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button>
          <Icon type="ellipsis" />
        </Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">转资申请</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>任务</div>
      <div className={styles.heading}>20</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>费用进度</div>
      <div className={styles.heading}>80%</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="3">
    <Description term="项目经理">曲丽丽</Description>
    <Description term="项目阶段">设计</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="合同金额">¥ 5.08 万元</Description>
    <Description term="部门公司">乌鲁木齐</Description>
    <Description term="项目状态"><Badge status="processing" text="进行中" /></Description>
  </DescriptionList>
);

const tabList = [
  {
    key: 'overview',
    tab: '概览',
  },
  {
    key: 'info',
    tab: '信息',
  },
  {
    key: 'content',
    tab: '内容',
  },
  {
    key: 'progess',
    tab: '进度',
    count: 2,
  },
  {
    key: 'cost',
    tab: '成本',
  },
  {
    key: 'q',
    tab: '质量',
  },
  {
    key: 'docs',
    tab: '文档',
  },
  {
    key: 'report',
    tab: '报告',
  },
];

@connect()
export default class ProjectProfile extends Component {
  handleTabChange = key => {
    const { dispatch, match } = this.props;
    switch (key) {
      case 'overview':
        dispatch(routerRedux.push(`${match.url}/overview`));
        break;
      case 'info':
        dispatch(routerRedux.push(`${match.url}/info`));
        break;
      case 'content':
        dispatch(routerRedux.push(`${match.url}/content`));
        break;
      case 'docs':
        dispatch(routerRedux.push(`${match.url}/docs`));
        break;
      case 'cost':
        dispatch(routerRedux.push(`${match.url}/cost`));
        break;
      case 'report':
        dispatch(routerRedux.push(`${match.url}/report`));
        break;
      default:
        break;
    }
  };

  render() {
    const { match, routerData, location } = this.props;
    const routes = getRoutes(match.path, routerData);

    return (
      <PageHeaderLayout
        title="新疆移动 2018 年二期工程"
        logo={
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
        }
        action={action}
        content={description}
        extraContent={extra}
        tabList={tabList}
        tabActiveKey={location.pathname.replace(`${match.url}/`, '')}
        onTabChange={this.handleTabChange}
      >
        <Switch>
          {routes.map(item => (
            <Route key={item.key} path={item.path} component={item.component} exact={item.exact} />
          ))}
          <Redirect from="/" to={`/projects/${match.params.id}/info`} />
        </Switch>
      </PageHeaderLayout>
    );
  }
}

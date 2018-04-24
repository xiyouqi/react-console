import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { routerRedux, Route, Switch, Redirect } from 'dva/router';
import { Button, Menu, Dropdown, Icon, Row, Col, Form, message, Badge } from 'antd';
import DescriptionList from 'components/DescriptionList';
import { getRoutes } from '../../utils/utils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StepForm from './StepForm';
import styles from './ProjectProfile.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const menu = (
  <Menu>
    <Menu.Item key="1">资产核查</Menu.Item>
    <Menu.Item key="2">审计</Menu.Item>
    <Menu.Item key="3">后评估</Menu.Item>
  </Menu>
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
    <Description term="项目状态">
      <Badge status="processing" text="进行中" />
    </Description>
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

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class ProjectProfile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

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

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rule/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const { match, routerData, location } = this.props;
    const { modalVisible } = this.state;
    const routes = getRoutes(match.path, routerData);

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      current,
    };

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
        <Button type="primary" onClick={() => this.handleModalVisible(true)}>
          转资申请
        </Button>
      </Fragment>
    );

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

        <StepForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}

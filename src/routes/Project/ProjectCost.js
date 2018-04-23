import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Radio, Divider } from 'antd';
import StandardTable from 'components/StandardTable';

import styles from './ProjectCost.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
export default class VendorList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

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

  render() {
    const { rule: { data }, loading } = this.props;
    const { selectedRows } = this.state;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">甲供材料</RadioButton>
          <RadioButton value="waiting">乙供材料</RadioButton>
        </RadioGroup>
      </div>
    );

    const columns = [
      {
        title: '项目阶段',
        dataIndex: 'project',
      },
      {
        title: '物料编码',
        dataIndex: 'projectCode',
      },
      {
        title: '物料名称',
        dataIndex: 'materielName',
      },
      {
        title: '材料类型',
        dataIndex: 'type',
      },
      {
        title: '规格',
        dataIndex: 'format',
      },
      {
        title: '单位',
        dataIndex: 'unit',
      },
      {
        title: '数量',
        dataIndex: 'projectNumber',
      },
      {
        title: '单价',
        dataIndex: 'projectPrice',
      },
      {
        title: '任务点',
        dataIndex: 'taskPoint',
      },
      {
        title: '地点描述',
        dataIndex: 'place',
      },
      {
        title: '是否资产',
        dataIndex: 'assets',
      },
      {
        title: '操作',
        render: () => (
          <Fragment style={{ paddingLeft: '0' }}>
            <a href="#">编辑</a>
            <Divider type="vertical" />
            <a href="#">删除</a>
          </Fragment>
        ),
      },
    ];
    return (
      <Card bordered={false} title="成本列表" extra={extraContent}>
        <div className={styles.tableList}>
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={data}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
    );
  }
}

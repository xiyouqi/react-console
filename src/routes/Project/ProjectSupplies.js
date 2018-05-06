import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Radio, Divider, Button, Input, Select } from 'antd';
import StandardTable from 'components/StandardTable';

import styles from './ProjectCost.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const { Option } = Select;

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.rule,
}))
export default class ProjectCost extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 10,
      },
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
    const { list, loading } = this.props;
    const { selectedRows } = this.state;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="1">
          <RadioButton value="1">甲供材料</RadioButton>
          <RadioButton value="2">乙供材料</RadioButton>
          <RadioButton value="3">设备</RadioButton>
        </RadioGroup>
        <Select
          className={styles.slectRight}
          placeholder="供应商"
          onChange={this.handleFormSubmit}
          style={{ width: 100 }}
        >
          <Option value="1">供应商B</Option>
          <Option value="2">供应商C</Option>
          <Option value="3">供应商D</Option>
          <Option value="4">供应商F</Option>
        </Select>
        <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );

    const columns = [
      {
        title: '材料名称',
        dataIndex: 'cost_name',
      },
      {
        title: '规格',
        dataIndex: 'cost_format',
      },
      {
        title: '单位',
        dataIndex: 'cost_unit',
      },
      {
        title: '项目定额',
        dataIndex: 'cost_num',
        render: value => {
          return Math.ceil(value * Math.random() * 110 / 100);
        },
        align: 'right',
      },
      {
        title: '数量',
        dataIndex: 'cost_num',
        align: 'right',
      },
      {
        title: '单价',
        dataIndex: 'cost_price',
        align: 'right',
      },
      {
        title: '使用',
        dataIndex: 'cost_stock',
        align: 'right',
        render: value => {
          return Math.ceil(Math.random() * value);
        },
      },
      {
        title: '库存',
        dataIndex: 'cost_stock',
        align: 'right',
      },
      {
        title: '操作',
        render: (value, record) => (
          <Fragment>
            <a href="#123">{record.cost_stock ? '领料申请' : '采购申请'}</a>
            <Divider type="vertical" />
            <a href="#123">退料</a>
          </Fragment>
        ),
      },
    ];

    const UploadBtn = (
      <div>
        <Button
          icon="car"
          type="primary"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          采购申请
        </Button>
        <Button
          icon="export"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8, marginLeft: 8 }}
        >
          领料申请
        </Button>
      </div>
    );

    return (
      <Card bordered={false} title={UploadBtn} extra={extraContent}>
        <div className={styles.tableList}>
          <StandardTable
            selectedRows={selectedRows}
            loading={loading}
            data={list}
            columns={columns}
            onSelectRow={this.handleSelectRows}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </Card>
    );
  }
}

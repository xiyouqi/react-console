import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Radio, Divider, Button, Input, Select } from 'antd';
import StandardTable from 'components/StandardTable';
import StepForm from './StepForm';

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
    modalVisible: false,
    current: 0,
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

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  render() {
    const { list, loading } = this.props;
    const { selectedRows, current, modalVisible } = this.state;

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
        title: '资产标签号',
        dataIndex: 'as_code',
      },
      {
        title: '名称',
        dataIndex: 'as_name',
      },
      {
        title: '规格',
        dataIndex: 'as_format',
      },
      {
        title: '数量',
        dataIndex: 'as_num',
      },
      {
        title: '合同价值（元）',
        dataIndex: 'as_amount',
      },
      {
        title: '分摊价值（元）',
        dataIndex: 'as_share_expense',
      },
      {
        title: '合计',
        dataIndex: 'as_amount_sum',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="#">处理</a>
            <Divider type="vertical" />
            <a href="#">转资</a>
          </Fragment>
        ),
      },
    ];

    const UploadBtn = (
      <div>
        <Button
          icon="pay-circle-o"
          type="primary"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          转资申请
        </Button>
      </div>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
      current,
    };

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
        <StepForm {...parentMethods} modalVisible={modalVisible} />
      </Card>
    );
  }
}

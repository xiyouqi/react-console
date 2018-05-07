import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Button, Divider } from 'antd';
import StandardTable from 'components/StandardTable';

import styles from './ProjectCost.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.rule,
}))
export default class ProjectQ extends PureComponent {
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
        count: 3,
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

    const columns = [
      {
        title: '定额编号',
        dataIndex: 'q_code',
        key: 'q_code',
      },
      {
        title: '项目',
        dataIndex: 'q_name',
        width: 100,
      },
      {
        title: '质量要求',
        dataIndex: 'q_desc',
        width: 250,
      },
      {
        title: '拍照要求',
        dataIndex: 'photo_desc',
      },
      {
        title: '样本照片',
        dataIndex: 'photos',
      },
      {
        title: '责任人',
        align: 'center',
        dataIndex: 'owner',
      },
      {
        title: '施工单位',
        align: 'center',
        render: () => '诺基亚',
      },
      {
        title: '监理单位',
        dataIndex: 'q_is_jl',
        align: 'center',
      },
      {
        title: '验收',
        dataIndex: 'q_is_ys',
        align: 'center',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a href="#">上传</a>
            <Divider type="vertical" />
            <a href="#">验收</a>
          </Fragment>
        ),
      },
    ];

    const UploadBtn = (
      <div>
        <Button
          icon="upload"
          type="primary"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8 }}
        >
          上传照片
        </Button>
        <Button
          icon="check"
          onClick={() => this.handleModalVisible(true)}
          className={styles.uploadBtn}
          style={{ marginTop: 8, marginBottom: 8, marginLeft: 8 }}
        >
          质量验收
        </Button>
      </div>
    );

    return (
      <Card bordered={false} title={UploadBtn}>
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

import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Radio, Input, Button, Icon, Dropdown, Menu, Avatar, Select } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './DocList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class SearchList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list: { list }, loading } = this.props;

    const mainSearch = (
      <div className={styles.searchBar} style={{ textAlign: 'center' }}>
        <Select
          className={styles.slectRight}
          placeholder="项目一"
          onChange={this.handleFormSubmit}
          style={{ maxWidth: 200, width: '100%' }}
        >
          <Option value="1">项目一</Option>
          <Option value="2">项目二</Option>
          <Option value="3">项目三</Option>
          <Option value="4">项目四</Option>
        </Select>
        <Input.Search
          placeholder="请输入文档名关键字或后缀进行搜索"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">设计</RadioButton>
          <RadioButton value="waiting">组织</RadioButton>
          <RadioButton value="progress">实施</RadioButton>
          <RadioButton value="waiting">收尾</RadioButton>
          <RadioButton value="progress">审计</RadioButton>
          <RadioButton value="waiting">评估</RadioButton>
        </RadioGroup>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>创建者</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>创建时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const UploadBtn = (
      <Button
        icon="arrow-down"
        type="primary"
        onClick={() => this.handleModalVisible(true)}
        className={styles.uploadBtn}
      >
        下载
      </Button>
    );

    return (
      <PageHeaderLayout content={mainSearch}>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
            title={UploadBtn}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<a>编辑</a>, <MoreBtn />]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}

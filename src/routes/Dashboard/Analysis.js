import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, DatePicker, Tooltip, Menu, Dropdown } from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  WaterWave,
  Gauge,
} from 'components/Charts';
import Trend from 'components/Trend';
import NumberInfo from 'components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `项目 ${i}`,
    total: 323234,
  });
}

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  selectDate = type => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { rangePickerValue, salesType } = this.state;
    const { chart, loading } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;

    const salesPieData =
      salesType === 'all'
        ? salesTypeData
        : salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <div className={styles.salesExtra}>
          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
            今日
          </a>
          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
            本周
          </a>
          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
            本月
          </a>
          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
            全年
          </a>
        </div>
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{ width: 256 }}
        />
      </div>
    );

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: '项目',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: '签到数',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
        align: 'right',
      },
      {
        title: '周涨幅',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    return (
      <Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card title="项目综合统计" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo subTitle="项目总数" suffix="个" total={numeral(2389).format('0,0')} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="筹备中项目"
                    suffix="个"
                    total={numeral(245).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="进行中项目"
                    suffix="个"
                    total={numeral(850).format('0,0')}
                  />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <NumberInfo
                    subTitle="已完成项目"
                    suffix="个"
                    total={numeral(503).format('0,0')}
                  />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <img src="../src/assets/map.png" alt="map" />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="项目综合完成率"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="已完成" percent={24} />
            </Card>
            <Card
              className={styles.grade}
              title="项目任务执行效率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="项目执行效率" height={180} percent={65} />
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目任务总数"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <span dangerouslySetInnerHTML={{ __html: 1265 }} />}
              footer={<Field label="日均任务完成" value={`${numeral(103).format('0,0')}`} />}
              contentHeight={46}
            >
              <Trend flag="up" style={{ marginRight: 16 }}>
                周同比<span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日环比<span className={styles.trendText}>11%</span>
              </Trend>
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="延误任务"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(204).format('0,0')}
              footer={<Field label="转化率" value="60%" />}
              contentHeight={46}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目成本趋势"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(8846).format('0,0')}
              footer={<Field label="本日领料" value={numeral(1234).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目综合成本进度"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="78%"
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <Trend flag="up" style={{ marginRight: 16 }}>
                    周同比<span className={styles.trendText}>12%</span>
                  </Trend>
                  <Trend flag="down">
                    日环比<span className={styles.trendText}>11%</span>
                  </Trend>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane tab="项目完成进度" key="sales">
                <Row>
                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="项目完成率" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>项目完成进度排名</h4>
                      <ul className={styles.rankingList}>
                        {rankingListData.map((item, i) => (
                          <li key={item.title}>
                            <span className={i < 3 ? styles.active : ''}>{i + 1}</span>
                            <span>{item.title}</span>
                            <span>{numeral(item.total).format('0,0')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="现场签到统计"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        签到数
                        <Tooltip title="指标文案">
                          <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
                        </Tooltip>
                      </span>
                    }
                    gap={8}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo subTitle="签到率" total={85.47} status="up" subTotal={3.2} gap={8} />
                  <MiniArea line height={45} data={visitData2} />
                </Col>
              </Row>
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="项目类别占比"
              bodyStyle={{ padding: 24 }}
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>项目总数</h4>
              <Pie
                hasLegend
                subTitle="项目总数"
                total={() => (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: salesPieData.reduce((pre, now) => now.y + pre, 0),
                    }}
                  />
                )}
                data={salesPieData}
                valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

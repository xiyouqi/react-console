import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, DatePicker, Tabs, Tooltip, Icon } from 'antd';
import numeral from 'numeral';
import { MiniArea, MiniBar, Field, ChartCard, MiniProgress, Bar, Pie } from 'components/Charts';
import Trend from 'components/Trend';
import { getTimeDistance } from '../../utils/utils';
import styles from './ProjectOverview.less';

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
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

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
    const { rangePickerValue } = this.state;
    const { chart, loading } = this.props;
    const { visitData } = chart;

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

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const salesPieData = [
      {
        x: '未挂号',
        y: 244,
      },
      {
        x: '有库存',
        y: 267,
      },
      {
        x: '无库存',
        y: 244,
      },
      {
        x: '采购中',
        y: 244,
      },
    ];

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1} 周`,
        y: Math.floor(Math.random() * 10) + 85,
      });
    }

    return (
      <Fragment>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="成本进度"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <span dangerouslySetInnerHTML={{ __html: 1265 }} />}
              footer={<Field label="剩余" value={`${numeral(1242).format('0')}`} />}
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
              title="任务完成"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(238).format('0,0')}
              footer={<Field label="周任务" value={numeral(12).format('0,0')} />}
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={visitData} />
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
              total={numeral(34).format('0,0')}
              footer={<Field label="延误率" value="10%" />}
              contentHeight={46}
            >
              <MiniBar data={visitData} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目进展"
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
              <TabPane tab="项目进度" key="sales">
                <Row gutter={16}>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar height={295} title="任务完成率" data={salesData} />
                    </div>
                  </Col>
                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <h4 style={{ marginTop: 8, marginBottom: 24 }}>供应链进度</h4>
                    <Pie
                      hasLegend
                      subTitle="物料状态"
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
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>
      </Fragment>
    );
  }
}

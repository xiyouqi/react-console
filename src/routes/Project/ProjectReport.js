import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Icon } from 'antd';
import numeral from 'numeral';
import { Field, ChartCard, MiniProgress, Gauge, WaterWave} from 'components/Charts';
import Trend from 'components/Trend';
import { getTimeDistance } from '../../utils/utils';
import styles from './ProjectReport.less';

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ monitor, loading }) => ({
  monitor,
  loading: loading.models.monitor,
}))
export default class Monitor extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
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
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="项目周期"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={() => <span dangerouslySetInnerHTML={{ __html: 1265 }} />}
              footer={<Field label="剩余天数" value={`${numeral(12).format('0')}`} />}
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
              title="项目进展"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="98%"
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
              <MiniProgress percent={98} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              title="平均任务延误"
              action={
                <Tooltip title="指标说明">
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total="0.68%"
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
              <MiniProgress percent={0.68} strokeWidth={8} target={80} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="各部门占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Card
                    bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                    bordered={false}
                  >
                    <WaterWave height={161} title="部门1" percent={34} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                    bordered={false}
                  >
                    <WaterWave height={161} title="部门2" percent={24} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                    bordered={false}
                  >
                    <WaterWave height={161} title="部门3" percent={42} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        {/* <Row gutter={24} style={{ marginTop: 24 }}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="各部门占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="部门1"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="部门2"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="部门3"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row> */}
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col xl={18} lg={24} sm={24} xs={24}>
            <Card title="任务完成效率" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Card
                    style={{ marginBottom: 24 }}
                    bodyStyle={{ textAlign: 'center' }}
                    bordered={false}
                  >
                    <Gauge title="部门1" height={180} percent={87} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ marginBottom: 24 }}
                    bodyStyle={{ textAlign: 'center' }}
                    bordered={false}
                    color="#5DDECF"
                  >
                    <Gauge title="部门2" height={180} percent={93} />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card
                    style={{ marginBottom: 24 }}
                    bodyStyle={{ textAlign: 'center' }}
                    bordered={false}
                    color="#2FC25B"
                  >
                    <Gauge title="部门3" height={180} percent={98} />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

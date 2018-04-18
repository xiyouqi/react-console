import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Icon,
  Tooltip,
  Divider,
} from 'antd';
import DescriptionList from 'components/DescriptionList';

const { Description } = DescriptionList;


@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchAdvanced'],
}))
export default class ProjectInfo extends Component {

  render() {
    return (
      <Card title="项目信息" style={{ marginBottom: 24 }} bordered={false}>
        <DescriptionList style={{ marginBottom: 24 }}>
          <Description term="用户姓名">付小小</Description>
          <Description term="会员卡号">32943898021309809423</Description>
          <Description term="身份证">3321944288191034921</Description>
          <Description term="联系方式">18112345678</Description>
          <Description term="联系地址">
            曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
          </Description>
        </DescriptionList>
        <DescriptionList style={{ marginBottom: 24 }} title="基本信息">
          <Description term="某某数据">725</Description>
          <Description term="该数据更新时间">2017-08-08</Description>
          <Description>&nbsp;</Description>
          <Description
            term={
              <span>
                某某数据
                <Tooltip title="数据说明">
                  <Icon
                    style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                    type="info-circle-o"
                  />
                </Tooltip>
              </span>
            }
          >
            725
          </Description>
          <Description term="该数据更新时间">2017-08-08</Description>
        </DescriptionList>
        <h4 style={{ marginBottom: 16 }}>合同</h4>
        <Card type="inner" title="项目合同列表">
          <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称">
            <Description term="负责人">林东东</Description>
            <Description term="角色码">1234567</Description>
            <Description term="所属部门">XX公司 - YY部</Description>
            <Description term="过期时间">2017-08-08</Description>
            <Description term="描述">
              这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
            </Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" style={{ marginBottom: 16 }} title="组名称" col="1">
            <Description term="学名">
              Citrullus lanatus (Thunb.) Matsum. et
              Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
            </Description>
          </DescriptionList>
          <Divider style={{ margin: '16px 0' }} />
          <DescriptionList size="small" title="组名称">
            <Description term="负责人">付小小</Description>
            <Description term="角色码">1234568</Description>
          </DescriptionList>
        </Card>
      </Card>
    );
  }
}

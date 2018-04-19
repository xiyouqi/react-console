const basicGoods = [
  {
    id: '第一阶段',
    department: '部门1',
    name: '三毛',
    other: '部门2、部门4',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第二阶段',
    department: '部门1',
    name: '三毛',
    other: '部门3、部门4',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第三阶段',
    department: '部门1',
    name: '三毛',
    other: '部门2、部门5',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第四阶段',
    department: '部门1',
    name: '三毛',
    other: '部门3、部门4、部门6',
    start: '2018-06-24',
    end: '2019-06-24',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '新疆移动项目二期工程',
    rate: '供应商1',
    status: 'processing',
    operator: '部门1',
    cost: '2018-06-24',
  },
  {
    key: '2',
    time: '新疆移动项目二期工程',
    rate: '供应商2',
    status: 'success',
    operator: '部门1',
    cost: '2018-06-24',
  },
  {
    key: '3',
    time: '新疆移动项目二期工程',
    rate: '供应商3',
    status: 'success',
    operator: '部门1',
    cost: '2018-06-24',
  },
  {
    key: '4',
    time: '新疆移动项目二期工程',
    rate: '供应商4',
    status: 'success',
    operator: '部门1',
    cost: '2018-06-24',
  },
  {
    key: '5',
    time: '新疆移动项目二期工程',
    rate: '供应商5',
    status: 'success',
    operator: '部门1',
    cost: '2018-06-24',
  },
];

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因',
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒',
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

export const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  getProfileBasicData,
  getProfileAdvancedData,
};

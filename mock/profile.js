const basicGoods = [
  {
    id: '第一阶段',
    department: '部门1',
    name: '三毛',
    other: '部门2、部门4',
    state: '已完成',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第二阶段',
    department: '部门1',
    name: '三毛',
    other: '部门3、部门4',
    state: '已完成',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第三阶段',
    department: '部门1',
    name: '三毛',
    other: '部门2、部门5',
    state: '进行中',
    start: '2018-06-24',
    end: '2019-06-24',
  },
  {
    id: '第四阶段',
    department: '部门1',
    name: '三毛',
    other: '部门3、部门4、部门6',
    state: '暂停',
    start: '2018-06-24',
    end: '2019-06-24',
  },
];
const basicProgress = [
  {
    key: '1',
    agreementNumber: '12343',
    agreementCode: '23243545',
    agreementType: `类型1`,
    agreementValue: '53万元',
    payment: '银行汇票',
    deliveryDate: '2019-09-08',
    operator: '猴子',
    department: '部门1',
    bankInfo: '招商银行',
    date: '2018-06-08',
    remark: '无',
  },
  {
    key: '2',
    agreementNumber: '343',
    agreementCode: '43545',
    agreementType: `类型2`,
    agreementValue: '24万元',
    payment: '银行汇票',
    deliveryDate: '2019-09-08',
    operator: '三毛',
    department: '部门2',
    bankInfo: '招商银行',
    date: '2018-06-08',
    remark: '无',
  },
  {
    key: '3',
    agreementNumber: '12343',
    agreementCode: '23243545',
    agreementType: `类型1`,
    agreementValue: '53万元',
    payment: '银行汇票',
    deliveryDate: '2019-09-08',
    operator: '猴子',
    department: '部门1',
    bankInfo: '招商银行',
    date: '2018-06-08',
    remark: '无',
  },
  {
    agreementNumber: '343',
    agreementCode: '43545',
    agreementType: `类型2`,
    agreementValue: '24万元',
    payment: '银行汇票',
    deliveryDate: '2019-09-08',
    operator: '三毛',
    department: '部门2',
    bankInfo: '招商银行',
    date: '2018-06-08',
    remark: '无',
  },
  {
    key: '3',
    agreementNumber: '12343',
    agreementCode: '23243545',
    agreementType: `类型1`,
    agreementValue: '53万元',
    payment: '银行汇票',
    deliveryDate: '2019-09-08',
    operator: '猴子',
    department: '部门1',
    bankInfo: '招商银行',
    date: '2018-06-08',
    remark: '无',
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

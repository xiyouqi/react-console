import { parse } from 'url';
import projectData from './project-data';

const titles = [
  '社会管理综合治理接入项目',
  '移动通信网项目二期',
  '高新区红星紫郡集客接入',
  '兰州至张掖骨干传输网五期',
  '农商银行专线业务网',
  '工程建设管理系统三期',
  '宽带业务支撑系统二期',
  '大青山移动通信网一期',
];

const types = [
  '移动通信网',
  '传输网',
  '集客接入',
  '业务网',
  '支撑网网管系统',
  '业务支撑系统',
  '信息化系统和信息安全系统',
  '局房土建及动力配套',
];

const avatars = [
  '../src/assets/pdf.png', // Alipay
  '../src/assets/docx.png', // Angular
  '../src/assets/rar.png', // Ant Design
  '../src/assets/wenjianjia.png', // Ant Design Pro
  '../src/assets/xlsx.png', // Bootstrap
];

const docTitles = [
  '设计图纸.pdf',
  '项目施工规范.docx',
  '项目验收资料.rar',
  '现场照片',
  '项目执行计划跟踪.xlsx',
];

const docTags = ['设计', '施工,规范', '验收', '质量,照片', '计划'];

const avatars2 = [
  '../src/assets/avatars/avatar-ben.png',
  '../src/assets/avatars/avatar-finn.png',
  '../src/assets/avatars/avatar-han.png',
  '../src/assets/avatars/avatar-leia.png',
  '../src/assets/avatars/avatar-luke.png',
  '../src/assets/avatars/avatar-poe.png',
  '../src/assets/avatars/avatar-rey.png',
  '../src/assets/avatars/avatar-yoda.png',
];

const projectAvatars = [
  '../src/assets/civil-engineering.png', // Alipay
  '../src/assets/collector-access.png', // Angular
  '../src/assets/communication-network.png', // Ant Design
  '../src/assets/support-network.png', // Ant Design Pro
  '../src/assets/transmission-network.png', // Bootstrap
  '../src/assets/information-system.png', // React
  '../src/assets/transmission-network.png', // Bootstrap
  '../src/assets/information-system.png', // React
];

const covers = [
  'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
  'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfycs.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
];
const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

const user = [
  '池大同',
  '曲建红',
  '林河',
  '池傲天',
  '艾米',
  '霍恩斯',
  '红石',
  '大青山',
  '林雨裳',
  '沙若',
];

export function fakeList(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i % 8],
      task_code: projectData['建筑安装工程量概算表(表三)甲'][i % 15 + 1][1],
      task: projectData['建筑安装工程量概算表(表三)甲'][i % 15 + 1][2],
      cost_name: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][1],
      cost_format: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][2],
      cost_unit: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][3],
      cost_no_tax_price: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][4],
      cost_tax: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][5],
      cost_price: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][6],
      cost_num: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][7],
      cost_no_tax_amount: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][8],
      cost_tax_amount: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][9],
      cost_amount: projectData['国内器材概算表(表四)甲 主要材料表'][i % 10 + 1][10],
      q_code: projectData['质量管理要求'][i % 3 + 1][0],
      q_name: projectData['质量管理要求'][i % 3 + 1][1],
      q_desc: projectData['质量管理要求'][i % 3 + 1][2],
      q_photo_desc: projectData['质量管理要求'][i % 3 + 1][3],
      q_photos: projectData['质量管理要求'][i % 3 + 1][4],
      q_is_sg: projectData['质量管理要求'][i % 3 + 1][5],
      q_is_jl: projectData['质量管理要求'][i % 3 + 1][6],
      q_is_ys: projectData['质量管理要求'][i % 3 + 1][7],
      as_code: projectData['资产明细'][i % 38 + 2][1],
      as_name: projectData['资产明细'][i % 38 + 2][2],
      as_category: projectData['资产明细'][i % 38 + 2][3],
      as_item: projectData['资产明细'][i % 38 + 2][4],
      as_subject: projectData['资产明细'][i % 38 + 2][5],
      as_section: projectData['资产明细'][i % 38 + 2][6],
      as_format: projectData['资产明细'][i % 38 + 2][7],
      as_num: projectData['资产明细'][i % 38 + 2][8],
      as_enable: projectData['资产明细'][i % 38 + 2][10],
      as_amount: projectData['资产明细'][i % 38 + 2][13],
      as_place: projectData['资产明细'][i % 38 + 2][12],
      as_share_expense: projectData['资产明细'][i % 38 + 2][14],
      as_amount_sum: projectData['资产明细'][i % 38 + 2][15],
      doc_title: docTitles[i % 5],
      doc_icon: avatars[i % 5],
      doc_tag: docTags[i % 5],
      cost_stock: Math.floor(Math.random() * 10),
      type: types[i % 8],
      avatar: avatars[i % 8],
      cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - i % 4],
      status: ['active', 'exception', 'normal'][i % 3],
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: projectAvatars[i % 8],
      href: '#',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      subDescription: desc[i % 5],
      description:
        '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:
        '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
      members: [
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
          name: '曲丽丽',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
          name: '王昭君',
        },
        {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
          name: '董娜娜',
        },
      ],
    });
  }

  return list;
}

export function getFakeList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: '那是一种内在的东西，他们到达不了，也无法触及的',
    updatedAt: new Date(),
    member: '科学搬砖组',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
    updatedAt: new Date('2017-07-24'),
    member: '全组都是吴彦祖',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
    updatedAt: new Date(),
    member: '中二少女团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: '那时候我只会想自己想要什么，从不想自己拥有什么',
    updatedAt: new Date('2017-07-23'),
    member: '程序员日常',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: '凛冬将至',
    updatedAt: new Date('2017-07-23'),
    member: '高逼格设计天团',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: '生命就像一盒巧克力，结果往往出人意料',
    updatedAt: new Date('2017-07-23'),
    member: '骗你来学计算机',
    href: '',
    memberLink: '',
  },
];

export const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: user[0],
      avatar: avatars2[0],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: user[1],
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: user[2],
      avatar: avatars2[1],
    },
    group: {
      name: '高逼格设计天团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: user[3],
      avatar: avatars2[2],
    },
    group: {
      name: '中二少女团',
      link: 'http://github.com/',
    },
    project: {
      name: '六月迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: user[4],
      avatar: avatars2[4],
    },
    project: {
      name: '5 月日常迭代',
      link: 'http://github.com/',
    },
    template: '将 @{project} 更新至已发布状态',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: user[5],
      avatar: avatars2[3],
    },
    project: {
      name: '工程效能',
      link: 'http://github.com/',
    },
    comment: {
      name: '留言',
      link: 'http://github.com/',
    },
    template: '在 @{project} 发布了 @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: user[6],
      avatar: avatars2[5],
    },
    group: {
      name: '程序员日常',
      link: 'http://github.com/',
    },
    project: {
      name: '品牌迭代',
      link: 'http://github.com/',
    },
    template: '在 @{group} 新建项目 @{project}',
  },
];

export default {
  getNotice,
  getActivities,
  getFakeList,
};

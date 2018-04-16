import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '工作台',
    icon: 'desktop',
    path: 'dashboard/workplace',
  },
  {
    name: '项目',
    icon: 'appstore-o',
    path: 'projects',
  },
  {
    name: '文档',
    icon: 'folder',
    path: 'docs',
  },
  {
    name: '报表',
    icon: 'dot-chart',
    path: 'dashboard/analysis',
  },
  {
    name: '数据',
    icon: 'database',
    path: 'data',
    children: [
      {
        name: '供应商',
        path: 'vendors',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '设置',
    icon: 'setting',
    path: 'exception',
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);

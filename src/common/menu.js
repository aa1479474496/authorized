import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '首页',
    path: ''
  },
  {
    name: '详情页',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic'
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin'
      }
    ]
  }
]

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`)
    }
    return result;
  })
}

export const getMenuData = () => formatter(menuData);

// getFlatMenuData(getMenuData());
// function getFlatMenuData(menus) {
//   let keys = {};
//   menus.forEach(item => {
//     if (item.children) {
//       keys[item.path] = { ...item };
//       keys = { ...keys, ...getFlatMenuData(item.children) };
//     }
//     else {
//       keys[item.path] = { ...item };
//     }
//   });
//   return keys;
// }

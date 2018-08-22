const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}
// const f = 'component';
// const path = '/user';

// const routerData = {
//   '/': { component: f, name: "首页", authority: undefined },
//   '/profile/advanced': { component: f, name: "高级详情页", authority: "admin" },
//   '/profile/basic': { component: f, name: "基础详情页", authority: undefined },
//   '/user': { component: f, name: "用户", authority: undefined },
//   '/user/login/aaaa': { component: f, name: "登录", authority: undefined },
//   '/user/login': { component: f, name: "登录", authority: undefined },
//   '/user/register': { component: f, name: "注册", authority: undefined },
//   '/user/register/1111': { component: f, name: "注册1111", authority: undefined }
// }

export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  )
  routes = routes.map(item => item.replace(path, ''));
  const renderArr = getRenderArr(routes);
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

// getRoutes(path, routerData);


function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i++) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!');
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}
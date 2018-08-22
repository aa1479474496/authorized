import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => {
  return !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });
}

const dynamicWrapper = (app, models, component) => {
  return dynamic({
    app,
    models: () => {
      return models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`))
    },
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache
        });
      });
    }
  })
}

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    }
    else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {   
    '/': {
      component: dynamicWrapper(app, ['index'], () => import('../routes/IndexPage'))
    },
    '/auth': {
      component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout'))
    },
    '/auth/profile/basic': {
      component: dynamicWrapper(app, [], () => import('../routes/Profile/BasicProfile'))
    },
    '/auth/profile/advanced': {
      component: dynamicWrapper(app, [], () => import('../routes/Profile/AdvancedProfile'))
    },
    '/list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/index'))
    },
    '/test': {
      component: dynamicWrapper(app, [], () => import('../routes/Test/index'))
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../routes/User/User'))
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login'))
    },
    '/user/register': {
      component: dynamicWrapper(app, [], () => import('../routes/User/Register'))
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403'))
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404'))
    }
  }

  const menuData = getFlatMenuData(getMenuData());

  const routerData = {};
  Object.keys(routerConfig).forEach(path => {
    let menuKey = Object.keys(menuData).find(key => path == key);
    let menuItem = {};
    if(menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority
    };
    routerData[path] = router;
  });
  return routerData;
}


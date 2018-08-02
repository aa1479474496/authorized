import dynamic from 'dva/dynamic';

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
    component
  })
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['index'], () => import('../routes/IndexPage'))
    }
  }

  const routerData = {};
  Object.keys(routerConfig).forEach(path => {
    let router = routerConfig[path];
    router = {
      ...router
    }
    routerData[path] = router;
  });
  return routerData;
}


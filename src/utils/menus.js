import { getRequest } from "./api";

const formatRoutes = (routes) => {
  let fmtRoutes = [];
  routes.forEach((router) => {
    let { path, component, name, iconCls, children } = router;
    if (children && children instanceof Array) {
      children = formatRoutes(children);
    }
    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component(resolve) {
        // 判断组件以什么开头，到对应的目录去找
        if (component.startsWith("Home")) {
          require(["@/views/" + component + ".vue"], resolve);
        } else if (component.startsWith("Emp")) {
          require(["@/views/emp/" + component + ".vue"], resolve);
        } else if (component.startsWith("Per")) {
          require(["@/views/per/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sal")) {
          require(["@/views/sal/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sta")) {
          require(["@/views/sta/" + component + ".vue"], resolve);
        } else if (component.startsWith("Sys")) {
          require(["@/views/sys/" + component + ".vue"], resolve);
        }
      },
    };
    fmtRoutes.push(fmRouter);
  });
  return fmtRoutes;
};

export const initMenu = (router, store) => {
  // 如果有数据，初始化路由菜单
  if (store.state.routes.length > 0) {
    return;
  } else {
    getRequest("/system/config/menu").then((resp) => {
      if (resp) {
        // 格式化好路由
        let fmtRoutes = formatRoutes(resp);
        // 添加到 router
        router.addRoutes(fmtRoutes);
        // 将数据存入 Vuex
        store.commit("initRoutes", fmtRoutes);
      }
    });
  }
};

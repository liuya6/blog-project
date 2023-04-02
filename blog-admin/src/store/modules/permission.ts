import type { AppRouteRecordRaw, Menu } from '/@/router/types';
import type { RouteMeta } from 'vue-router';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useUserStore } from './user';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';
import { permissionService } from '/@/api';
import { flatRoutes } from '/@/utils/tools';

import { asyncRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

import { PageEnum } from '/@/enums/pageEnum';

interface PermissionState {
  // 权限代码列表
  permCodeList: string[] | number[];
  // 路由是否已经动态添加上去了
  isDynamicAddedRoute: boolean;
  // 触发菜单更新
  lastBuildMenuTime: number;
  // 后台菜单列表
  backMenuList: Menu[];
  // 菜单列表
  frontMenuList: Menu[];
  //  是否使用后端路由
  isAsyncRouter: boolean;
  // 全部路由
  allRouter: any[];
  // 首页路由
  homePath: string;
}
export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
    isAsyncRouter: false,
    allRouter: [],
    homePath: PageEnum.BASE_HOME,
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList;
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList;
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getAllRouterNameList(): string[] {
      const flatRouteList = flatRoutes(this.allRouter, []);
      return flatRouteList.map((item) => item.name);
    },
    // getHomePath(): string {
    //   let homePath = PageEnum.BASE_HOME as string;
    //   for (let i = 0; i < this.allRouter.length; i++) {
    //     const item = this.allRouter[i];
    //     if (
    //       item.children &&
    //       item.children.length &&
    //       item.children.filter((v) => !v.meta.hideMenu).length
    //     ) {
    //       // firstHasChildrenItem = item;
    //       const arr = item.children.filter((v) => !v.meta.hideMenu);
    //       homePath = `${item.path}/${arr[0].path}`;
    //       break;
    //     }
    //   }
    //   return homePath;
    // },
  },
  actions: {
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    setAllRouter(payload: any) {
      this.allRouter = payload;
    },
    setHomePath(payload: string) {
      this.homePath = payload;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      // const { t } = useI18n();
      const userStore = useUserStore();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];

      const routeFilter = (route: AppRouteRecordRaw) => {
        // const { meta } = route;
        // const { roles } = meta || {};
        const meta =
          typeof route.meta === 'string' ? (JSON.parse(route.meta) as RouteMeta) : route.meta;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const meta =
          typeof route.meta === 'string' ? (JSON.parse(route.meta) as RouteMeta) : route.meta;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = this.homePath;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                const meta =
                  typeof route.meta === 'string'
                    ? (JSON.parse(route.meta) as RouteMeta)
                    : route.meta;
                route.meta = Object.assign({}, meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

      let router = asyncRoutes;
      if (this.isAsyncRouter) {
        router = await this.getRoutes();
      }
      routes = filter(router, routeFilter);
      routes = routes.filter(routeFilter);
      const menuList = transformRouteToMenu(routes, true);
      routes = filter(routes, routeRemoveIgnoreFilter);
      routes = routes.filter(routeRemoveIgnoreFilter);

      if (!this.isAsyncRouter) {
        // 如果用的静态路由就对菜单进行排序
        menuList.sort(sortRoutesData);
        routes.sort(sortRoutesData);
      }
      this.setFrontMenuList(menuList);
      // 将多级路由转换为 2 级路由

      routes = flatMultiLevelRoutes(routes);

      const homePath = getHomePath(routes);
      routes = [...routes, getRootRoute(homePath), PAGE_NOT_FOUND_ROUTE, ERROR_LOG_ROUTE];
      this.setHomePath(homePath);
      this.setAllRouter(routes);
      patchHomeAffix(routes);
      return routes;
    },

    async getRoutes() {
      const { data } = await permissionService.accountInfo();
      return transformObjToRoute(data);
    },
  },
});

function getHomePath(allRouter) {
  let homePath = PageEnum.BASE_HOME as string;
  for (let i = 0; i < allRouter.length; i++) {
    const item = allRouter[i];
    if (
      item.children &&
      item.children.length &&
      item.children.filter((v) => !v.meta.hideMenu).length
    ) {
      const arr = item.children.filter((v) => !v.meta.hideMenu);
      homePath = `${item.path}/${arr[0].path}`;
      break;
    }
  }
  return homePath;
}

function getRootRoute(homePath) {
  return {
    path: '/',
    name: 'Root',
    redirect: homePath,
    meta: {
      title: 'Root',
    },
  };
}

function sortRoutesData(a, b) {
  const aMeta = typeof a.meta === 'string' ? (JSON.parse(a.meta) as RouteMeta) : a.meta;
  const bMeta = typeof b.meta === 'string' ? (JSON.parse(b.meta) as RouteMeta) : b.meta;
  return (aMeta?.orderNo || 0) - (bMeta?.orderNo || 0);
}

// Need to be used outside the setup
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}

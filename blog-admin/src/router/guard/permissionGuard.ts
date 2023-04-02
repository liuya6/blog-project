import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '/@/store/modules/permission';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithOut } from '/@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

// import { RootRoute } from '/@/router/routes';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

// const ROOT_PATH = RootRoute.path;

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    // if (
    //   from.path === ROOT_PATH &&
    //   to.path === PageEnum.BASE_HOME &&
    //   permissionStore.homePath &&
    //   permissionStore.homePath !== PageEnum.BASE_HOME
    // ) {
    //   next(permissionStore.homePath);
    //   return;
    // }

    // 处理完登录后跳转到404页面
    // if (
    //   from.path === LOGIN_PATH &&
    //   to.name === PAGE_NOT_FOUND_ROUTE.name &&
    //   to.fullPath !== permissionStore.homePath
    // ) {
    //   next(permissionStore.homePath);
    //   return;
    // }

    const token = userStore.getToken;

    // 白名单可直接进入
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout;
        try {
          await userStore.afterLoginAction();
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/');
            return;
          }
        } catch {}
      }
      next();
      return;
    }

    // 令牌不存在
    if (!token) {
      // 您可以在未经许可的情况下访问。您需要将路由 meta.ignoreAuth 设置为 true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 重定向登录页面
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // 在上次获取时间为空时获取用户信息
    if (userStore.getLastUpdateTime === 0) {
      try {
        await userStore.getUserInfoAction();
      } catch (err) {
        next();
        return;
      }
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}

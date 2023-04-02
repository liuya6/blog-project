import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, ROLES_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { LoginParams } from '/@/api/sys/model/userModel';
import { userService } from '/@/api';

// import { doLogout, getUserInfo, loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
// import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { ResultEnum } from '/@/enums/httpEnum';

interface UserState {
  // userInfo: Nullable<UserInfo>;
  userInfo: string | undefined;
  access_token?: string;
  refresh_token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: undefined,
    // token
    access_token: undefined,
    refresh_token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): string {
      return this.userInfo || getAuthCache<string>(USER_INFO_KEY);
    },
    getToken(): string {
      return this.access_token || getAuthCache<string>(ACCESS_TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setAccessToken(info: string | undefined) {
      this.access_token = info ? info : ''; // for null or undefined value
      setAuthCache(ACCESS_TOKEN_KEY, info);
    },
    setRefreshToken(info: string | undefined) {
      this.refresh_token = info ? info : ''; // for null or undefined value
      setAuthCache(REFRESH_TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: string | undefined) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = '';
      this.access_token = '';
      this.refresh_token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ) {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const { data, code } = await userService.toLogin(loginParams, mode);
        if (code !== ResultEnum.SUCCESS) return Promise.reject('登陆失败');
        const { nickname, token } = data;
        this.setAccessToken(token);
        this.setUserInfo(nickname);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean) {
      if (!this.getToken) return null;
      // get user info
      const userInfo = this.userInfo;

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(permissionStore.homePath));
      }
      return userInfo;
    },

    async getUserInfoAction() {
      if (!this.getToken) return null;
      // const userInfo = await getUserInfo();
      const userInfo = (this.userInfo || getAuthCache<string>(USER_INFO_KEY)) as string;
      // const { roles = [] } = userInfo;
      // if (isArray(roles)) {
      //   const roleList = roles.map((item) => item.value) as RoleEnum[];
      //   this.setRoleList(roleList);
      // } else {
      //   userInfo.roles = [];
      //   this.setRoleList([]);
      // }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setAccessToken(undefined);
      this.setRefreshToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(undefined);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// 在设置之外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}

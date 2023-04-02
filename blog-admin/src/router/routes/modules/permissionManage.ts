import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const permissionManage: AppRouteModule = {
  path: '/permissionManage',
  name: 'PermissionManage',
  component: LAYOUT,
  redirect: '/permissionManage/accountManage',
  meta: {
    orderNo: 13,
    icon: 'carbon:settings-services',
    title: t('routes.permissionManage.permissionManage'),
  },
  children: [
    // {
    //   path: 'roleManage',
    //   name: 'RoleManage',
    //   component: () => import('/@/views/permissionManage/roleManage/index.vue'),
    //   meta: {
    //     icon: 'ic:outline-manage-accounts',
    //     title: t('routes.permissionManage.roleManage'),
    // //   },
    // // },
    // {
    //   path: 'roleAdd',
    //   name: 'RoleAdd',
    //   component: () => import('/@/views/permissionManage/roleManage/roleChange/index.vue'),
    //   meta: {
    //     title: t('routes.permissionManage.roleAdd'),
    //     hideMenu: true,
    //   },
    // },
    // {
    //   path: 'roleEdit',
    //   name: 'RoleEdit',
    //   component: () => import('/@/views/permissionManage/roleManage/roleChange/index.vue'),
    //   meta: {
    //     title: t('routes.permissionManage.roleEdit'),
    //     hideMenu: true,
    //   },
    // },

    {
      path: 'accountManage',
      name: 'AccountManage',
      component: () => import('/@/views/permissionManage/accountManage/index.vue'),
      meta: {
        icon: 'carbon:group-account',
        title: t('routes.permissionManage.accountManage'),
      },
    },
    {
      path: 'accountAdd',
      name: 'AccountAdd',
      component: () => import('/@/views/permissionManage/accountManage/accountChange/index.vue'),
      meta: {
        title: t('routes.permissionManage.accountAdd'),
        hideMenu: true,
      },
    },
    {
      path: 'accountEdit',
      name: 'AccountEdit',
      component: () => import('/@/views/permissionManage/accountManage/accountChange/index.vue'),
      meta: {
        title: t('routes.permissionManage.accountEdit'),
        hideMenu: true,
      },
    },
    {
      path: 'accountDel',
      name: 'AccountDel',
      component: getParentLayout(),
      meta: {
        title: t('routes.permissionManage.accountDel'),
        hideMenu: true,
      },
    },
    // {
    //   path: 'menuManage',
    //   name: 'MenuManage',
    //   component: () => import('/@/views/permissionManage/menuManage/index.vue'),
    //   meta: {
    //     title: t('routes.permissionManage.menuManage'),
    //     icon: 'carbon:open-panel-left',
    //   },
    // },
  ],
};

export default permissionManage;

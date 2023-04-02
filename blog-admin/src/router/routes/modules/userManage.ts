import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const userManage: AppRouteModule = {
  path: '/userManage',
  name: 'UserManage',
  component: LAYOUT,
  redirect: '/userManage/userList',
  meta: {
    orderNo: 12,
    icon: 'carbon:id-management',
    title: t('routes.userManage.userManage'),
  },
  children: [
    {
      path: 'userList',
      name: 'UserList',
      component: () => import('/@/views/userManage/userList/index.vue'),
      meta: {
        icon: 'carbon:user-avatar',
        title: t('routes.userManage.userList'),
      },
    },
  ],
};

export default userManage;

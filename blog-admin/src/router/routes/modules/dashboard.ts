import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 9,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.dashboard'),
  },
  children: [
    {
      path: 'statistics',
      name: 'Statistics',
      component: () => import('/@/views/dashboard/statistics/index.vue'),
      meta: {
        icon: 'wpf:statistics',
        title: t('routes.dashboard.statistics'),
      },
    },
  ],
};

export default dashboard;

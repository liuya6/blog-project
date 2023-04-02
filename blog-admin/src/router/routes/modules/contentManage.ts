import type { AppRouteModule } from '/@/router/types';

import { LAYOUT, getParentLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const contentManage: AppRouteModule = {
  path: '/contentManage',
  name: 'ContentManage',
  component: LAYOUT,
  redirect: '/contentManage/blogManage',
  meta: {
    orderNo: 10,
    icon: 'eos-icons:cluster-management-outlined',
    title: t('routes.contentManage.contentManage'),
  },
  children: [
    {
      path: 'blogManage',
      name: 'BlogManage',
      redirect: '/contentManage/blogManage/blogList',
      component: getParentLayout('Base'),
      meta: {
        icon: 'fluent-mdl2:document-management',
        title: t('routes.contentManage.blogManage'),
      },
      children: [
        {
          path: 'blogList',
          name: 'BlogList',
          component: () => import('/@/views/contentManage/blogManage/blogList/index.vue'),
          meta: {
            icon: 'carbon:playlist',
            title: t('routes.contentManage.blogList'),
          },
        },
        {
          path: 'blogTag',
          name: 'BlogTag',
          component: () => import('/@/views/contentManage/blogManage/blogTag/index.vue'),
          meta: {
            icon: 'carbon:tag',
            title: t('routes.contentManage.blogTag'),
          },
        },
      ],
    },
    {
      path: 'classifyManage',
      name: 'ClassifyManage',
      component: () => import('/@/views/contentManage/classifyManage/index.vue'),
      meta: {
        icon: 'carbon:classification',
        title: t('routes.contentManage.classifyManage'),
      },
    },
    {
      path: 'commentManage',
      name: 'CommentManage',
      component: () => import('/@/views/contentManage/commentManage/commentList/index.vue'),
      meta: {
        icon: 'carbon:result-new',
        title: t('routes.contentManage.commentManage'),
      },
    },
  ],
};

export default contentManage;

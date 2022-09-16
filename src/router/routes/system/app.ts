import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const app: AppRouteModule = {
  path: '/app',
  name: 'App',
  component: LAYOUT,
  redirect: '/system/app',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:grid-outline',
    title: t('system.menu.appmanager'),
    orderNo: 2,
  },
  children: [
    {
      path: 'app',
      name: 'App',
      component: () => import('/@/views/system/app/index.vue'),
      meta: {
        title: t('system.menu.app'),
        icon: 'ion:grid-outline',
        hideMenu: false,
      },
    },
  ],
};

export default app;

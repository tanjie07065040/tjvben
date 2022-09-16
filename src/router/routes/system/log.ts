import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const log: AppRouteModule = {
  path: '/log',
  name: 'Log',
  component: LAYOUT,
  redirect: '/system/log',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:grid-outline',
    title: t('system.menu.logmanager'),
    orderNo: 4,
  },
  children: [
    {
      path: 'log',
      name: 'Log',
      component: () => import('/@/views/system/log/index.vue'),
      meta: {
        title: t('system.menu.log'),
        icon: 'ion:grid-outline',
        hideMenu: false,
      },
    },
  ],
};

export default log;

import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const org: AppRouteModule = {
  path: '/org',
  name: 'Org',
  component: LAYOUT,
  redirect: '/system/org',
  meta: {
    orderNo: 1,
    hideChildrenInMenu: false,
    icon: 'ion:grid-outline',
    title: t('system.menu.orgmanager'),
  },
  children: [
    {
      path: 'org',
      name: 'Org',
      component: () => import('/@/views/system/org/index.vue'),
      meta: {
        title: t('system.menu.org'),
        icon: 'ion:grid-outline',
        hideMenu: false,
      },
    },
  ],
};

export default org;

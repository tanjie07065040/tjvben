import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const configuration: AppRouteModule = {
  path: '/system',
  name: 'Configuration',
  component: LAYOUT,
  redirect: '/system/configuration',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:grid-outline',
    title: t('system.menu.configurationmanager'),
    orderNo: 3,
  },
  children: [
    {
      path: 'configuration',
      name: 'Configuration',
      component: () => import('/@/views/system/configuration/index.vue'),
      meta: {
        title: t('system.menu.configuration'),
        icon: 'ion:grid-outline',
        hideMenu: false,
      },
    },
  ],
};

export default configuration;

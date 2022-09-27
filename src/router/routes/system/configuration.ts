import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const configuration: AppRouteModule = {
  path: '/configuration',
  name: 'Configuration',
  component: LAYOUT,
  redirect: '/system/configuration',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:md-build',
    title: t('system.menu.configurationmanager'),
    orderNo: 3,
    roles: [RoleEnum.SUPER, RoleEnum.TEST]
  },
  children: [
    {
      path: 'configuration',
      name: 'Configuration',
      component: () => import('/@/views/system/configuration/index.vue'),
      meta: {
        title: t('system.menu.configuration'),
        icon: 'ion:md-build',
        hideMenu: false,
        roles: [RoleEnum.SUPER, RoleEnum.TEST]
      },
    },
  ],
};

export default configuration;

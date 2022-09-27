import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const org: AppRouteModule = {
  path: '/org',
  name: 'Org',
  component: LAYOUT,
  redirect: '/system/org',
  meta: {
    orderNo: 1,
    hideChildrenInMenu: false,
    icon: 'ion:people-sharp',
    title: t('system.menu.orgmanager'),
    roles: [RoleEnum.SUPER, RoleEnum.TEST]
  },
  children: [
    {
      path: 'org',
      name: 'Org',
      component: () => import('/@/views/system/org/index.vue'),
      meta: {
        title: t('system.menu.org'),
        icon: 'ion:people-sharp',
        hideMenu: false,
        roles: [RoleEnum.SUPER, RoleEnum.TEST]
      },
    },
  ],
};

export default org;

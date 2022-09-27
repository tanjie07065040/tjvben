import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const app: AppRouteModule = {
  path: '/app',
  name: 'App',
  component: LAYOUT,
  redirect: '/system/app',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:ios-magnet',
    title: t('system.menu.appmanager'),
    orderNo: 2,
    roles: [RoleEnum.SUPER, RoleEnum.TEST]
  },
  children: [
    {
      path: 'app',
      name: 'App',
      component: () => import('/@/views/system/app/index.vue'),
      meta: {
        title: t('system.menu.app'),
        icon: 'ion:ios-magnet',
        hideMenu: false,
        roles: [RoleEnum.SUPER, RoleEnum.TEST]
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/system/role/index.vue'),
      meta: {
        title: t('system.menu.role'),
        icon: 'ion:ios-magnet',
        hideMenu: false,
        roles: [RoleEnum.SUPER, RoleEnum.TEST]
      }
    },
    {
      path: 'menu',
      name: 'Menu',
      component: () => import('/@/views/system/menu/index.vue'),
      meta: {
        title: t('system.menu.menu'),
        icon: 'ion:ios-magnet',
        hideMenu: false,
        roles: [RoleEnum.SUPER, RoleEnum.TEST]
      },
    },
  ],
};

export default app;

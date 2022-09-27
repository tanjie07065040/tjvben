import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';
import { RoleEnum } from '/@/enums/roleEnum';

const log: AppRouteModule = {
  path: '/log',
  name: 'Log',
  component: LAYOUT,
  redirect: '/system/log',
  meta: {
    hideChildrenInMenu: false,
    icon: 'ion:podium',
    title: t('system.menu.logmanager'),
    orderNo: 4,
    roles: [RoleEnum.SUPER]
  },
  children: [
    {
      path: 'log',
      name: 'Log',
      component: () => import('/@/views/system/log/index.vue'),
      meta: {
        title: t('system.menu.log'),
        icon: 'ion:podium',
        //hideMenu: false,
        hideChildrenInMenu: true,
        roles: [RoleEnum.SUPER]
      },
      children: [
        {
          path: 'detail/:id',
          name: 'LogDetail',
          component: () => import('/@/views/system/log/components/LogDetail.vue'),
          meta: {
            currentActiveMenu: '/log/log',
            title: t('routes.demo.feat.tabDetail'),
            hideMenu: true,
            dynamicLevel: 3,
            realPath: '/log/log/detail',
          },
        }
      ]
    },
  ],
};

export default log;

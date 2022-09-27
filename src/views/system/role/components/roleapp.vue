<template>
  <div class="roleapp">
    <BasicTable @register="registerTable" @row-click="appRowClick" ref="basicTableApp" :height=800>
    </BasicTable>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';
import { AppColumns } from './app.data';
import { AppModel } from '/@/api/system/model/appModel';
import { BasicTable, TableActionType, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import roleModel from './roleModel.vue';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { EventKeys } from '/@/utils/eventbus/eventName';

export default defineComponent({
  name: 'roleappMangaer',
  components: { BasicTable, TableAction, roleModel },
  setup() {

    const basicTableApp = ref<Nullable<TableActionType>>(null);

    function getTableAction() {
      const tableAction = unref(basicTableApp);
      if (!tableAction) {
        throw new Error('tableAction is null');
      }
      return tableAction;
    }

    let appDataList: AppModel[] = [];

    const [registerTable, { }] = useTable({
      title: '应用列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: AppColumns,
      canResize: false,
      striped: true,
      dataSource: appDataList,
      showSummary: true,
      useSearchForm: false,
      pagination: { pageSize: 15, showQuickJumper: false, showSizeChanger: false, position: ['bottomCenter'] },
      showIndexColumn: false,
      showTableSetting: false,
      bordered: true,
      fetchSetting: {
        pageField: 'pageIndex',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'totalElements',
      },
    })

    // 应用行点击事件 然后获取对应的角色
    function appRowClick(record: Recordable) {
      console.log(record);
      rxevent.publish(EventKeys.APPCHOOSE, record);
      // TODO 获取角色数据
    }


    onMounted(() => {

      for (let index = 0; index < 40; index++) {
        appDataList.push({
          id: buildUUID(),
          appname: `城市生命线应用-${index}`,
          appid: 'APP0001',
          appsupport: "燃气专项",
          apptype: "城市生命线-燃气",
          appenable: (index % 2).toString()
        });
      }
      if (appDataList.length > 0) {
        getTableAction().clearSelectedRowKeys();
        getTableAction().setSelectedRowKeys([appDataList[0].id]);
        const currentData = getTableAction().getSelectRows()[0] as AppModel;
        console.log(currentData);
        rxevent.publish(EventKeys.APPCHOOSE, appDataList[0]);
      }

    })



    onUnmounted(() => {

    })

    return {
      registerTable,
      appRowClick,
      basicTableApp
    }
  }
})
</script>
<style lang="less" scoped>
.roleapp {
  margin-top: 16px;
  height: 100%;

  ::v-deep(.vben-basic-table .ant-table) {
    height: 800px !important;
  }
}
</style>
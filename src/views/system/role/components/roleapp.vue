<template>
  <BasicTable @register="registerTable" @row-click="appRowClick">
  </BasicTable>

</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { AppColumns } from './app.data';
import { AppModel } from '/@/api/system/model/appModel';
import { BasicTable, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import roleModel from './roleModel.vue';

export default defineComponent({
  name: 'roleappMangaer',
  components: { BasicTable, TableAction, roleModel },
  setup() {

    let appDataList: AppModel[] = [];

    const [registerTable, { }] = useTable({
      title: '应用列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: AppColumns,
      dataSource: appDataList,
      showSummary: true,
      useSearchForm: false,
      pagination: true,
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

    })

    onUnmounted(() => {

    })

    return {
      registerTable,
      appRowClick
    }
  }
})
</script>
<style lang="less" scoped>

</style>
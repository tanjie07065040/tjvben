<template>

  <BasicTable @register="registerTable" :loading="loading">
    <template #expandedRowRender="{ record }">
      <a-row :span="16">
        <a-col :span="6">
          请求地址：{{record.operationrequestrouterpage}}
        </a-col>
        <a-col :span="10">
          操作内容：{{record.content}}
        </a-col>
      </a-row>
    </template>
  </BasicTable>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

import { BasicTable, useTable, } from '/@/components/Table';

import { LogColumns, LogSearch } from './log.data';
import { formatToDateTime } from '/@/utils/dateUtil';
import { buildUUID } from '/@/utils/uuid';
import { LogModel } from '/@/api/system/model/logModel';


export default defineComponent({
  name: 'logManager',
  components: { BasicTable },
  setup() {
    let logDataList: LogModel[] = [];
    const loading = ref(false);

    // 用户table初始化
    const [registerTable, { setTableData }] = useTable({
      title: '日志列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: LogColumns,
      dataSource: logDataList,
      showSummary: true,
      // 开启查询
      useSearchForm: true,
      pagination: true,
      expandRowByClick: true,
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件属性配置
      formConfig: {
        labelWidth: 80,
        schemas: LogSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        logDataList = [];
        for (let index = 0; index < 5; index++) {
          logDataList.push({
            id: buildUUID(),
            operationappname: `APP ${index}`,
            operationname: 'TEST01',
            operationtime: formatToDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
            operationorgname: '测试部',
            operationapprole: '测试人员',
            operationregion: '武汉',
            operationrequestrouterpage: 'api/v1/getlog',
            content: '获取日志信息',
          });
        }
        setTableData(logDataList);
        return searchInfo;
      },
      bordered: true,
      fetchSetting: {
        pageField: 'pageIndex',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'totalElements',
      },
    })


    // 初始化加载数据
    onMounted(() => {
      loading.value = true;
      for (let index = 0; index < 25; index++) {
        logDataList.push({
          id: buildUUID(),
          operationappname: `APP ${index}`,
          operationname: 'TEST01',
          operationtime: formatToDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          operationorgname: '测试部',
          operationapprole: '测试人员',
          operationregion: '武汉',
          operationrequestrouterpage: 'api/v1/getlog',
          content: '获取日志信息',
        });
      }
      loading.value = false;
    })
    // 页面释放
    onUnmounted(() => {
      logDataList = [];
    })

    return {
      registerTable,
      logDataList,
      loading,
    }
  },

});
</script>
<style lang="less" scoped>

</style>
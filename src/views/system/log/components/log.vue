<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue';

import { BasicTable, useTable, } from '/@/components/Table';

import { LogColumns, LogSearch } from './log.data';
import { formatToDateTime } from '/@/utils/dateUtil';
import { buildUUID } from '/@/utils/uuid';
export default defineComponent({
  name: 'logManager',
  components: { BasicTable },
  setup() {

    const logDataList: any = [];

    // 用户table初始化
    const [registerTable, { getRawDataSource }] = useTable({
      title: '日志列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: LogColumns,
      dataSource: logDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: true,
      expandRowByClick: true,
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: LogSearch
      },
      bordered: true,
      fetchSetting: {
        pageField: 'pageIndex',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'totalElements',
      },
    })

    const searchInfo = reactive<Recordable>({});

    function initLogData() {
      const data = getRawDataSource();
      console.log(data);
    }


    // 初始化加载数据
    onMounted(() => {
      for (let index = 0; index < 25; index++) {
        logDataList.push({
          id: buildUUID(),
          operationappname: `APP ${index}`,
          operationname: 'TEST01',
          operationtime: formatToDateTime(new Date()),
          operationorgname: '测试部',
          operationapprole: '测试人员',
          operationregion: '武汉',
          operationrequestrouterpage: 'api/v1/getlog',
          content: '获取日志信息',
        });
      }
    })
    // 页面释放
    onUnmounted(() => {
      logDataList.value = [];
    })

    return {
      registerTable,
      searchInfo,
      initLogData,
      logDataList,
    }
  },

});
</script>
<style lang="less" scoped>

</style>
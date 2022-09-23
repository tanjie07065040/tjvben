<template>
  <div class="configuration">
    <BasicTable @register="registerTableConfiguration">
      <template #toolbar>
        <a-button type="primary" @click="addConfigurationData()">新增配置</a-button>
      </template>

      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            ifShow: record.configurationenable==='0'?false:true,
            onClick: updateConfigurationData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeConfigurationData.bind(null, record),
            },
          },
        ]" :dropDownActions="[
          {
            label: record.configurationenable==='0'? '启用': '停用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpen.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
  <configurationModelVue @register="registerModal" @success="handlersuccess"></configurationModelVue>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue';
import { ConfigurationColums, ConfigurationSearch } from './configuration.data';
import { BasicTable, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import configurationModelVue from './configurationModel.vue';
import cloneDeep from 'lodash-es/cloneDeep';
import { EventKeys } from '/@/utils/eventbus/eventName';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { ConfigurationGroupModel } from '/@/api/system/model/configurationGroupModel';
import { ConfigurationModel } from '/@/api/system/model/configurationModel';

export default defineComponent({
  name: 'configurationMangaer',
  components: { BasicTable, TableAction, configurationModelVue },
  setup() {

    let configurationDataList: ConfigurationModel[] = []

    const [registerModal, { openModal }] = useModal();

    const [registerTableConfiguration, { setTableData, reload }] = useTable({
      title: '配置列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: ConfigurationColums,
      dataSource: configurationDataList,
      showSummary: true,
      useSearchForm: true,
      canResize: false,
      pagination: { pageSize: 11, showQuickJumper: false, showSizeChanger: false },
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: ConfigurationSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        configurationDataList = [];
        setTableData(cloneDeep(configurationDataList));
        reload();
        return searchInfo;
      },
      bordered: true,
      fetchSetting: {
        pageField: 'pageIndex',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'totalElements',
      },
      actionColumn: {
        width: 200,
        title: '操作',
        dataIndex: 'action',
        // 操作列开启
        slots: { customRender: 'action' },
      },
    })

    function addConfigurationData() {
      openModal(true, {
        isUpdate: false
      }), false
    }

    function updateConfigurationData(record: Recordable) {
      openModal(true, {
        isUpdate: true,
        record
      })
    }

    function removeConfigurationData(record: Recordable) {
      console.log(record);
    }

    function handleOpen(record: Recordable) {
      console.log(record);
    }

    function handlersuccess(data) {
      console.log(data);
    }


    const number = ref(30);

    onBeforeMount(() => {
      rxevent.subscribe(EventKeys.CONFIGURATIONCHOOSE, 'configurationPage', (record: ConfigurationGroupModel) => {
        console.log(record);
        configurationDataList = [];
        number.value++;
        for (let index = 0; index < number.value; index++) {
          configurationDataList.push({
            id: buildUUID(),
            configurationname: `CONFIGURATION--${index}`,
            configurationvalue: '00000000',
            configurationdefaultvalue: '',
            configurationenable: (index % 2).toString(),
          });
        }
        setTableData(cloneDeep(configurationDataList));
        reload();
      })

    })

    onUnmounted(() => {
      rxevent.unsubscribe(EventKeys.CONFIGURATIONCHOOSE, 'configurationGroupPage');
    })

    return {
      registerTableConfiguration,
      addConfigurationData,
      updateConfigurationData,
      removeConfigurationData,
      handleOpen,
      handlersuccess,
      registerModal,
    }
  }
})
</script>
<style lang="less" scoped>
.configuration {
  height: 100%;

  ::v-deep(.vben-basic-table .ant-table) {
    height: 710px !important;
    overflow-x: hidden;
  }

  ::v-deep(.ant-table-body) {
    max-height: 614px !important;
    height: 614px !important;
  }
}
</style>
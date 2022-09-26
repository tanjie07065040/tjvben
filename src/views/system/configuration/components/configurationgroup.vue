<template>
  <div class="configurationgroup">
    <BasicTable @register="registerTableConfigurationGroup" @row-click="appRowClick" ref="basicTableConfiguration">
      <template #toolbar>
        <a-button type="primary" @click="addConfigurationGroupData()">新增配置组</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            ifShow: record.configurationgroupenable==='0'?false:true,
            onClick: updateConfigurationGroupData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeConfigurationGroupData.bind(null, record),
            },
          },
        ]" :dropDownActions="[
          {
            label: record.configurationgroupenable==='0'? '启用': '停用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpenGroup.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
  <configurationGroupModelVue @register="registerGroupModal" @success="handlergroupsuccess">
  </configurationGroupModelVue>


</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, unref } from 'vue';
import { ConfigurationGroupColums, ConfigurationGroupSearch } from './configurationgroup.data';
import { BasicTable, TableActionType, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import configurationGroupModelVue from './configurationGroupModel.vue';
import { ConfigurationGroupModel } from '/@/api/system/model/configurationGroupModel';
import cloneDeep from 'lodash-es/cloneDeep';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { EventKeys } from '/@/utils/eventbus/eventName';

export default defineComponent({
  name: 'configurationGroupMangaer',
  components: { BasicTable, TableAction, configurationGroupModelVue },
  setup() {

    const basicTableConfiguration = ref<Nullable<TableActionType>>(null);

    function getTableAction() {
      const tableAction = unref(basicTableConfiguration);
      if (!tableAction) {
        throw new Error('tableAction is null');
      }
      return tableAction;
    }

    let configurationGroupDataList: ConfigurationGroupModel[] = [];
    const [registerGroupModal, { openModal }] = useModal();

    const [registerTableConfigurationGroup, { setTableData, reload }] = useTable({
      title: '配置组列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: ConfigurationGroupColums,
      dataSource: configurationGroupDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: { pageSize: 12, showQuickJumper: false, showSizeChanger: false },
      showIndexColumn: false,
      showTableSetting: false,
      canResize: false,
      bordered: true,
      formConfig: {
        labelWidth: 80,
        schemas: ConfigurationGroupSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        configurationGroupDataList = [];
        setTableData(cloneDeep(configurationGroupDataList));
        reload();
        return searchInfo;
      },
      fetchSetting: {
        pageField: 'pageIndex',
        sizeField: 'pageSize',
        listField: 'records',
        totalField: 'totalElements',
      },
      actionColumn: {
        width: 100,
        title: '操作',
        dataIndex: 'action',
        // 操作列开启
        slots: { customRender: 'action' },
      },
    })

    function addConfigurationGroupData() {
      openModal(true, {
        isUpdate: false
      })
    }

    function updateConfigurationGroupData(record: Recordable) {
      openModal(true, {
        isUpdate: true,
        record
      })
    }

    function removeConfigurationGroupData(record: Recordable) {
      console.log(record);
    }


    function handleOpenGroup(record: Recordable) {
      console.log(record);
    }

    function handlergroupsuccess(data) {
      console.log(data);
    }

    // 应用行点击事件 然后获取对应的角色
    function appRowClick(record: Recordable) {
      console.log(record);
      // TODO 获取角色数据
      rxevent.publish(EventKeys.CONFIGURATIONCHOOSE, record);
    }


    onMounted(() => {
      for (let index = 0; index < 30; index++) {
        configurationGroupDataList.push({
          id: buildUUID(),
          configurationgroupname: `配置分组-${index}`,
          configurationgroupenable: (index % 2).toString()
        });
      }
      if (configurationGroupDataList.length > 0) {
        getTableAction().clearSelectedRowKeys();
        getTableAction().setSelectedRowKeys([configurationGroupDataList[0].id]);
        const currentData = getTableAction().getSelectRows()[0] as ConfigurationGroupModel;
        console.log(currentData);
        rxevent.publish(EventKeys.CONFIGURATIONCHOOSE, currentData);
      }

    })

    onUnmounted(() => {

    })

    return {
      registerTableConfigurationGroup,
      addConfigurationGroupData,
      updateConfigurationGroupData,
      removeConfigurationGroupData,
      registerGroupModal,
      handlergroupsuccess,
      handleOpenGroup,
      appRowClick,
      basicTableConfiguration
    }
  }
})
</script>
<style lang="less" scoped>
.configurationgroup {
  width: calc(100% - 0px);
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
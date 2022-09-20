<template>
  <div class="app">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="addAppData()">新增应用</a-button>
      </template>
      <template #expandedRowRender="{ record }">
        <a-row :span="16">
          <a-col :span="6">
            应用支持: {{record.appsupport}}
          </a-col>
          <a-col :span="10">
            应用类型: {{record.apptype}}
          </a-col>
        </a-row>
      </template>
      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            onClick: updateAppData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeAppData.bind(null, record),
            },
          },
        ]" :dropDownActions="[
          {
            label: record.appenable==='0'? '启用': '停用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpen.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
  <div>
    <BasicModal @register="registerAppModal" :title="TitleContent" v-bind="$attrs" @ok="handleSubmit">
      <BasicForm @register="registerApForm">
      </BasicForm>
    </BasicModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import { BasicModal, useModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { BasicTree } from '/@/components/Tree';
import { BasicTable, useTable, TableAction } from '/@/components/Table';

import { AppSearch, UserFormSchema, AppColumns } from './app.data';
import { AppModel } from '/@/api/system/model/appModel';
import { buildUUID } from '/@/utils/uuid';
import { useMessage } from '/@/hooks/web/useMessage';
export default defineComponent({
  name: 'appManager',
  components: { BasicModal, BasicForm, BasicTree, BasicTable, TableAction },
  setup() {
    // 消息提示组件
    const { createMessage } = useMessage();

    const TitleContent = ref('');
    let appDataList: AppModel[] = [];

    const [registerAppModal, { setModalProps, closeModal: closeUserModal, openModal: openUserModal }] = useModal();


    const [registerApForm, { resetFields, validate, setFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: UserFormSchema,
      showActionButtonGroup: false,
    });
    // 用户table初始化
    const [registerTable, { reload, setTableData, getRawDataSource, insertTableDataRecord, updateTableDataRecord, deleteTableDataRecord }] = useTable({
      title: '应用列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: AppColumns,
      dataSource: appDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: true,
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: AppSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        appDataList = [];
        setTableData(appDataList);
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

    const searchInfo = reactive<Recordable>({});

    function initUserData() {
      const data = getRawDataSource();
      console.log(data);
    }

    function addAppData() {
      // 打开模态框
      openUserModal();
      // 属性重置
      // resetFields();
      TitleContent.value = '新增'

    }

    function updateAppData(record) {
      openUserModal();
      resetFields();
      setFieldsValue({ ...record });
      TitleContent.value = '编辑'
      console.log(record);
    }

    function removeAppData(record) {
      console.log(record);
      deleteTableDataRecord(record.name)
    }

    async function handleSubmit() {

      const values = await validate();
      console.log(values);
      if (TitleContent.value === '新增') {
        insertTableDataRecord(values);
      } else if (TitleContent.value === '编辑') {
        updateTableDataRecord(values.name, values);
      }
      // 关闭模态框
      closeUserModal();

      setModalProps({ confirmLoading: false });
      reload();
    }

    function handleOpen(record: Recordable) {
      createMessage.success(JSON.stringify(record));
    }

    // 初始化加载数据
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
    // 页面释放
    onUnmounted(() => {
    })

    return {
      registerTable,
      addAppData,
      updateAppData,
      removeAppData,
      searchInfo,
      initUserData,
      registerApForm,
      registerAppModal,
      handleSubmit,
      TitleContent,
      appDataList,
      handleOpen,
    }
  },

});
</script>
<style lang="less" scoped>
.app {
  height: 80%;
  width: 100%;

  ::v-deep(.vben-basic-table-form-container) {
    padding: 0 !important;
  }

  ::v-deep(.vben-basic-table) {
    height: 90% !important;
  }
}
</style>
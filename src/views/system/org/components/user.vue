<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="addUserData()">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            onClick: updateUserData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeUserData.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
  <div>
    <BasicModal @register="registerUserModal" :title="TitleContent" v-bind="$attrs" @ok="handleSubmit">
      <BasicForm @register="registerUserForm">
        <template #user="{ model, field }">
          <div>
            <a-select :options=SexOptions v-model:value="model[field]" allowClear />
          </div>
        </template>
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

import { UserColumns, UserFormSchema, UserSearch } from './user.data';
export default defineComponent({
  name: 'orgUser',
  components: { BasicModal, BasicForm, BasicTree, BasicTable, TableAction },
  setup() {

    const TitleContent = ref('');
    const SexOptions: any = ref([]);
    const userDataList: any = [];

    const [registerUserModal, { setModalProps, closeModal: closeUserModal, openModal: openUserModal }] = useModal();


    const [registerUserForm, { resetFields, validate, setFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: UserFormSchema,
      showActionButtonGroup: false,
    });
    // 用户table初始化
    const [registerTable, { reload, getRawDataSource, insertTableDataRecord, updateTableDataRecord, deleteTableDataRecord }] = useTable({
      title: '账号列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'name',
      // 显示列配置
      columns: UserColumns,
      dataSource: userDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: true,
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: UserSearch
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

    function addUserData() {
      // 打开模态框
      openUserModal();
      // 属性重置
      // resetFields();
      TitleContent.value = '新增'

    }

    function updateUserData(record) {
      openUserModal();
      resetFields();
      setFieldsValue({ ...record });
      TitleContent.value = '编辑'
      console.log(record);
    }

    function removeUserData(record) {
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

    // 初始化加载数据
    onMounted(() => {

      SexOptions.value = [
        {
          label: '男',
          value: 'man'
        },
        {
          label: '女',
          value: 'women'
        },
        {
          label: '其他',
          value: 'other'
        },
      ]
      for (let index = 0; index < 40; index++) {
        userDataList.push({
          name: `${index} John Brown`,
          sex: SexOptions.value[index % SexOptions.value.length].value,
        });
      }
    })
    // 页面释放
    onUnmounted(() => {
    })

    return {
      registerTable,
      addUserData,
      updateUserData,
      removeUserData,
      searchInfo,
      initUserData,
      registerUserForm,
      registerUserModal,
      handleSubmit,
      SexOptions,
      TitleContent,
      userDataList,
    }
  },

});
</script>
<style lang="less" scoped>

</style>
<template>
  <div class="system_org">
    <div class="system_org_left">
      <BasicTree ref="loadTreeRef" title="组织机构" :treeData="treeDataList" :checkable="true" :loading="treeLoading"
        @check="handleCheck" />
      <!--自定义属性title和key :fieldNames="{ title: 'displayName', key: 'id' }" -->
    </div>
    <div class="system_org_right">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue';
import { BasicModal, useModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { cloneDeep } from 'lodash-es';

import { treeData } from './org.data';
import { UserColumns, UserFormSchema, UserSearch } from './user.data';
export default defineComponent({
  name: 'orgManager',
  components: { BasicModal, BasicForm, BasicTree, BasicTable, TableAction },
  setup() {
    const loadTreeRef = ref<Nullable<TreeActionType>>(null);
    const treeDataList = ref<TreeItem[]>([]);
    const treeLoading = ref(false);

    // 加载组织机构数据
    function loadOrgData() {
      treeLoading.value = true;
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        treeDataList.value = cloneDeep(treeData);
        treeLoading.value = false;
      }, 2000);
    }

    // 组织机构CheckBox选择
    function handleCheck(checkedKeys, e) {
      console.log('onChecked', checkedKeys, e);
      // 选择组织机构后重新加载用户数据
      reload();
    }

    const TitleContent = ref('');
    const SexOptions: any = ref([]);

    const [registerUserModal, { setModalProps, closeModal: closeUserModal, openModal: openUserModal }] = useModal();


    const [registerUserForm, { resetFields, validate, setFieldsValue }] = useForm({
      labelWidth: 100,
      schemas: UserFormSchema,
      showActionButtonGroup: false,
    });
    // 用户table初始化
    const [registerTable, { reload, getRawDataSource }] = useTable({
      title: '账号列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: UserColumns,
      useSearchForm: true,
      showTableSetting: false,
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
        // slots: { customRender: 'action' },
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
    }

    async function handleSubmit() {

      const values = await validate();
      console.log(values);
      // 关闭模态框
      closeUserModal();

      setModalProps({ confirmLoading: false });
    }

    // 初始化加载数据
    onMounted(() => {
      loadOrgData();
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
    })

    onUnmounted(() => {
      treeDataList.value = [];
    })
    return {
      loadTreeRef,
      treeDataList,
      treeLoading,
      loadOrgData,
      handleCheck,
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
    }
  },

});

</script>
<style lang="less" scoped>
.system_org {
  width: calc(100% - 0px);
  height: 100px;

  .system_org_left {
    float: left;
    margin-left: 10px;
    margin-top: 17px;
    width: 35%;
    height: 100%;
    background-color: red;
  }

  .system_org_right {
    float: right;
    width: 64%;
    height: 100%;
  }
}
</style>
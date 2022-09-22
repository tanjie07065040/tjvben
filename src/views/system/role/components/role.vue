<template>
  <div class="role">
    <BasicTable @register="registerTableRole">
      <template #toolbar>
        <a-button type="primary" @click="addRoleData()">新增角色</a-button>
      </template>

      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'ion:git-compare-outline',
            tooltip: '关联用户',
            onClick: relationUser.bind(null, record),
          },
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            onClick: updateRoleData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeRoleData.bind(null, record),
            },
          },
        ]" :dropDownActions="[
          {
            label: record.roleenable==='0'? '启用': '停用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpen.bind(null, record),
            },
          },
        ]" />
      </template>
    </BasicTable>
  </div>
  <roleModel @register="registerModal" @success="handlersuccess"></roleModel>
  <roleuserrelationModelVue @register="registerRelationModal" @success="handlerrelationsuccess">
  </roleuserrelationModelVue>

</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { RoleColumns, RoleSearch } from './role.data';
import { RoleModel } from '/@/api/system/model/roleModel';
import { BasicTable, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import roleModel from './roleModel.vue';
import { useModal } from '/@/components/Modal';
import roleuserrelationModelVue from './roleuserrelationModel.vue';

export default defineComponent({
  name: 'roleMangaer',
  components: { BasicTable, TableAction, roleModel, roleuserrelationModelVue },
  setup() {

    let roleDataList: RoleModel[] = []


    const [registerModal, { openModal: openroleModel }] = useModal();

    const [registerTableRole, { setTableData }] = useTable({
      title: '角色列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: RoleColumns,
      canResize: false,
      dataSource: roleDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: { pageSize: 12 },
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: RoleSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        roleDataList = [];
        setTableData(roleDataList);
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


    function addRoleData() {
      openroleModel(true, {
        isUpdate: false
      })
    }

    function updateRoleData(record: Recordable) {
      openroleModel(true, {
        isUpdate: true,
        record
      })
    }
    const [registerRelationModal, { openModal: relationOpneModel }] = useModal();

    function relationUser(record: Recordable) {
      console.log(record);
      relationOpneModel(true, {
        record
      })
    }

    function removeRoleData(record: Recordable) {
      console.log(record);
    }

    function handleOpen(record: Recordable) {
      console.log(record);
    }

    function handlersuccess(data) {
      console.log(data);
    }


    function handlerrelationsuccess(data) {
      console.log(data);
    }
    onMounted(() => {

      for (let index = 0; index < 30; index++) {
        roleDataList.push({
          id: buildUUID(),
          rolename: `管理员-${index}`,
          appname: `应用${index}`,
          rolenumber: 'AAAA000001',
          roleenable: (index % 2).toString(),
        });
      }
    })

    onUnmounted(() => {

    })

    return {
      registerTableRole,
      addRoleData,
      updateRoleData,
      removeRoleData,
      handleOpen,
      handlersuccess,
      registerModal,
      relationUser,
      registerRelationModal,
      handlerrelationsuccess,
    }
  }
})
</script>
<style lang="less" scoped>
.role {
  margin-top: 16px;
  height: 100%;

  ::v-deep(.vben-basic-table .ant-table) {
    height: 700px !important;
  }
}
</style>
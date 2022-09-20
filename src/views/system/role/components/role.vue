<template>
  <div class="role">
    <div class="roleleft">
      <BasicTable @register="registerTable">
      </BasicTable>
    </div>
    <div class="roleright">
      <BasicTable @register="registerTableRole">
        <template #toolbar>
          <a-button type="primary" @click="addRoleData()">新增角色</a-button>
        </template>

        <template #action="{ record }">
          <TableAction :actions="[
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
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { AppColumns } from './app.data';
import { RoleColumns, RoleSearch } from './role.data';
import { AppModel } from '/@/api/system/model/appModel';
import { RoleModel } from '/@/api/system/model/roleModel';
import { BasicTable, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import roleModel from './roleModel.vue';
import { useModal } from '/@/components/Modal';

export default defineComponent({
  name: 'roleMangaer',
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

    let roleDataList: RoleModel[] = []

    const [registerModal, { openModal }] = useModal();

    const [registerTableRole, { setTableData }] = useTable({
      title: '角色列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      // 显示列配置
      columns: RoleColumns,
      dataSource: roleDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: true,
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

    function addRoleData() {
      openModal(true, {
        isUpdate: false
      })
    }

    function updateRoleData(record: Recordable) {
      openModal(true, {
        isUpdate: false,
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

      for (let index = 0; index < 10; index++) {
        roleDataList.push({
          id: buildUUID(),
          rolename: `管理员-${index}`,
          rolenumber: 'AAAA000001',
          roleenable: (index % 2).toString(),
        });
      }
    })

    onUnmounted(() => {

    })

    return {
      registerTable,
      registerTableRole,
      addRoleData,
      updateRoleData,
      removeRoleData,
      handleOpen,
      handlersuccess,
      registerModal
    }
  }
})
</script>
<style lang="less" scoped>
.role {
  width: calc(100% - 0px);
  height: 96%;

  .roleleft {
    float: left;
    margin-left: 10px;
    margin-top: 17px;
    width: 15%;
    height: 96%;
  }

  .roleright {
    float: right;
    width: 84%;
    height: 96%;
  }
}
</style>
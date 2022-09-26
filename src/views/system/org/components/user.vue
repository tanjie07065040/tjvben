<template>
  <div class="user">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <!-- <ApartmentOutlined :style="{width: 30,height: 30}" /> -->
        <a-button type="primary" @click="addUserData()">新增用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="[
           {
          icon: 'ion:git-compare-outline',
          tooltip: '关联角色',
          onClick: relationRole.bind(null, record),
        },
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
        ]" :dropDownActions="[
        {
          label: record.userenable==='0'? '启用': '停用',
          ifShow:record.userenable==='0'? true: false,
          popConfirm: {
            title: '是否启用？',
            confirm: handleOpen.bind(null, record),
          },
        }]" />
      </template>
    </BasicTable>
  </div>
  <div>
    <userModelVue @register=" registerOpenUserModal" @success="handlerUserSuccess">
    </userModelVue>
    <userrolerelationModelVue @register="registerUserRoleModal" @success="handlerUserRoleSuccess">
    </userrolerelationModelVue>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import { BasicModal, useModal } from '/@/components/Modal';
import { BasicForm } from '/@/components/Form/index';
import { BasicTree } from '/@/components/Tree';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import userrolerelationModelVue from './userrolerelationModel.vue';
import { UserColumns, UserSearch } from './user.data';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { OrgModel } from '/@/api/system/model/orgModel';
import { UserModel } from '/@/api/system/model/userModel';
import cloneDeep from 'lodash-es/cloneDeep';
import { EventKeys } from '/@/utils/eventbus/eventName';
import userModelVue from './userModel.vue';
import { ApartmentOutlined } from '@ant-design/icons-vue';
import { buildUUID } from '/@/utils/uuid';
export default defineComponent({
  name: 'orgUser',
  components: { ApartmentOutlined, BasicModal, BasicForm, BasicTree, BasicTable, TableAction, userrolerelationModelVue, userModelVue },
  setup() {

    const SexOptions: any = ref([]);
    let userDataList: UserModel[] = [];

    // 用户table初始化
    const [registerTable, { reload, insertTableDataRecord, updateTableDataRecord, deleteTableDataRecord, setTableData }] = useTable({
      title: '账号列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'name',
      // 显示列配置
      columns: UserColumns,
      dataSource: userDataList,
      showSummary: true,
      useSearchForm: true,
      canResize: false,
      pagination: { pageSize: 12, showQuickJumper: false, showSizeChanger: false },
      showIndexColumn: true,
      showTableSetting: true,
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        userDataList = [];
        setTableData(cloneDeep(userDataList));
        return searchInfo;
      },
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

    function addUserData() {
      // 打开模态框
      openUserModal(true, {
        isUpdate: false,
      });
    }

    function updateUserData(record) {
      openUserModal(true, {
        isUpdate: true,
        record
      });
    }

    function removeUserData(record) {
      console.log(record);
      deleteTableDataRecord(record.name)
    }

    function handlerUserSuccess(values: any) {
      console.log(values);
      if (!values.isUpdate) {
        insertTableDataRecord(values);
      } else {
        updateTableDataRecord(values.id, { name: values.name, sex: values.sex });
      }
      reload();
    }

    const number = ref(30)
    // 初始化加载数据
    onBeforeMount(() => {
      rxevent.subscribe(EventKeys.ORGCHOOSE, 'userPage', async (data: OrgModel) => {
        number.value++;
        userDataList = [];
        await initUserData(data);
        setTableData(cloneDeep(userDataList))
        reload();
      });
    })
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
      ];
    })

    function initUserData(orgdata: OrgModel) {
      console.log(orgdata);
      for (let index = 0; index < number.value; index++) {
        userDataList.push({
          id: buildUUID(),
          name: `${index} John Brown`,
          sex: SexOptions.value[index % SexOptions.value.length].value,
          userenable: (index % 2).toString()
        });
      }
    }

    const [registerOpenUserModal, { openModal: openUserModal }] = useModal();

    const [registerUserRoleModal, { openModal: UserRoleModal }] = useModal();

    const handlerUserRoleSuccess = () => {

    }

    function handleOpen(record: Recordable) {
      console.log(record);
    }

    const relationRole = (record: Recordable) => {
      UserRoleModal(true, {
        record
      })
    }
    // 页面释放
    onUnmounted(() => {
      rxevent.unsubscribe(EventKeys.ORGCHOOSE, 'userPage');
    })

    return {
      registerTable,
      addUserData,
      updateUserData,
      removeUserData,
      searchInfo,
      registerOpenUserModal,
      handlerUserSuccess,
      SexOptions,
      userDataList,
      relationRole,
      handlerUserRoleSuccess,
      registerUserRoleModal,
      handleOpen,
    }
  },

});
</script>
<style lang="less" scoped>
.user {
  height: 100%;

  ::v-deep(.vben-basic-table .ant-table) {
    height: 713px !important;
  }
}
</style>
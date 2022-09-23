<template>
  <div class="menu">
    <BasicTable @register="registerTableMenu">
      <template #toolbar>
        <a-button type="primary" @click="addMenuData()">新增菜单</a-button>
      </template>

      <template #action="{ record }">
        <TableAction :actions="[
          {
            icon: 'clarity:note-edit-line',
            tooltip: '编辑',
            onClick: updateMenuData.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            tooltip: '删除',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: removeMenuData.bind(null, record),
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
  <menuModelVue @register="registerModal" @success="handlersuccess"></menuModelVue>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { MenuColumns, MenuSearch } from './menu.data';
import { BasicTable, useTable } from '/@/components/Table';
import { buildUUID } from '/@/utils/uuid';
import { TableAction } from '/@/components/Table';
import menuModelVue from './menuModel.vue';
import { useModal } from '/@/components/Modal';
import { MenuModel } from '/@/api/system/model/menuModel';
import { rxevent } from '/@/utils/eventbus/eventaggregator.service';
import { EventKeys } from '/@/utils/eventbus/eventName';
import { AppModel } from '/@/api/system/model/appModel';
import cloneDeep from 'lodash-es/cloneDeep';
import { replaceCssColors } from 'vite-plugin-theme/es/client';

export default defineComponent({
  name: 'roleMangaer',
  components: { BasicTable, TableAction, menuModelVue },
  setup() {

    let menuDataList: MenuModel[] = []

    const [registerModal, { openModal }] = useModal();

    const [registerTableMenu, { setTableData, reload }] = useTable({
      title: '菜单列表',
      // 获取数据API信息
      // api: getUserDataMethod,
      rowKey: 'id',
      isTreeTable: true,
      // 显示列配置
      columns: MenuColumns,
      dataSource: menuDataList,
      showSummary: true,
      useSearchForm: true,
      pagination: { pageSize: 12 },
      canResize: false,
      showIndexColumn: true,
      showTableSetting: true,
      // 查询条件配置
      formConfig: {
        labelWidth: 80,
        schemas: MenuSearch
      },
      // 过滤请求前处理(查询和重置按钮事件)
      handleSearchInfoFn(searchInfo) {
        console.log('handleSearchInfoFn', searchInfo);
        // TODO 过滤查询数据
        // TODO 设置表的数据集
        menuDataList = [];
        setTableData(cloneDeep(menuDataList));
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

    function addMenuData() {
      openModal(true, {
        isUpdate: false
      })
    }

    function updateMenuData(record: Recordable) {
      openModal(true, {
        isUpdate: true,
        record
      })
    }

    function removeMenuData(record: Recordable) {
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
      rxevent.subscribe(EventKeys.APPCHOOSE, 'rolePage', (record: AppModel) => {
        console.log(record);
        number.value++;
        menuDataList = [];
        for (let index = 0; index < number.value; index++) {
          menuDataList.push({
            id: buildUUID(),
            menuname: `菜单-${index}`,
            menuorder: `${index}`,
            menuenable: (index % 2).toString(),
            menuurl: '/views/system/****',
            children: [
              {
                menuname: `子菜单-${index}`,
                menuorder: `${index}`,
                menuenable: (index % 2).toString(),
                menuurl: '/views/submenu/system/****',
              },
              {
                menuname: `子菜单-${index + 1}`,
                menuorder: `${index + 1}`,
                menuenable: (index % 2).toString(),
                menuurl: '/views/submenu/system/****',
              }
            ]
          });
        }
        setTableData(cloneDeep(menuDataList));
        reload();
      })
    })

    onMounted(() => {


    })

    onUnmounted(() => {
      menuDataList = [];
    })

    return {
      registerTableMenu,
      addMenuData,
      updateMenuData,
      removeMenuData,
      handleOpen,
      handlersuccess,
      registerModal,
    }
  }
})
</script>
<style lang="less" scoped>
.menu {
  margin-top: 16px;
  height: 100%;

  ::v-deep(.vben-basic-table .ant-table) {
    height: 700px !important;
  }
}
</style>
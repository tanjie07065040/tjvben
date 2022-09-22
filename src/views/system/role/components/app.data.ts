import { BasicColumn } from "/@/components/Table";

// 表列设计
export const AppColumns: BasicColumn[] =
  [
    {
      title: '主键',
      dataIndex: 'id',
      ifShow: false,
    },
    {
      title: '应用名称',
      dataIndex: 'appname',
      width: 60,
    },
  ]
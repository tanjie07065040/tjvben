import { DescItem } from "/@/components/Description";
import { BasicColumn, FormSchema } from "/@/components/Table";

export const LogColumns: BasicColumn[] = [
  {
    title: '主键',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '应用名称',
    dataIndex: 'operationappname',
    width: 120,
  },
  {
    title: '操作人',
    dataIndex: 'operationname',
    width: 120,
  },
  {
    title: '操作时间',
    dataIndex: 'operationtime',
    width: 120,
  },
  {
    title: '组织机构',
    dataIndex: 'operationorgname',
    width: 120,
  },
  {
    title: '角色',
    dataIndex: 'operationapprole',
    width: 80,
  },
  {
    title: '行政区划',
    dataIndex: 'operationregion',
    width: 80,
  },
  {
    title: '请求地址',
    dataIndex: 'operationrequestrouterpage',
    ifShow: false,
    width: 120,
  },
  {
    title: '操作内容',
    ifShow: false,
    dataIndex: 'content',
    width: 200,
  }
]

export const LogSearch: FormSchema[] = [
  {
    field: 'operationappname',
    label: '应用名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'operationname',
    label: '操作人',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 8 },
  },

]

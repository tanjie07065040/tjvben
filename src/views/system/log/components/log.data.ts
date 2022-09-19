import { BasicColumn, FormSchema } from "/@/components/Table";

export const UserColumns: BasicColumn[] = [
  {
    title: '应用名称',
    dataIndex: 'operationappname',
    width: 120,
  },
  {
    title: '操作人',
    dataIndex: 'operationname',
    width: 150,
  }
]

export const UserSearch: FormSchema[] = [
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

export const UserFormSchema: FormSchema[] = [
  {
    field: 'operationappname',
    label: '应用名称',
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },
  {
    field: 'operationname',
    label: '操作人',
    component: 'Input',

    required: true,
  },
];
import { BasicColumn, FormSchema } from "/@/components/Table";

export const UserColumns: BasicColumn[] = [
  {
    title: '应用名称',
    dataIndex: 'appname',
    width: 120,
  },
  {
    title: '应用唯一标识',
    dataIndex: 'appid',
    width: 150,
  }
]

export const UserSearch: FormSchema[] = [
  {
    field: 'appname',
    label: '应用名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'appid',
    label: '应用唯一标识',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const UserFormSchema: FormSchema[] = [
  {
    field: 'appname',
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
    field: 'appid',
    label: '应用唯一标识',
    component: 'Input',

    required: true,
  },
];
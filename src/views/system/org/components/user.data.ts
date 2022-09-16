import { BasicColumn, FormSchema } from "/@/components/Table";

export const UserColumns: BasicColumn[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 120,
  }
]

export const UserSearch: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const UserFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '姓名',
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Select',
    required: true,
    slot: 'user',
  },
];
import { Tag } from "ant-design-vue";
import { h } from "vue";
import { BasicColumn, FormSchema } from "/@/components/Table";


export const RoleColumns: BasicColumn[] =
  [
    {
      title: '主键',
      dataIndex: 'id',
      ifShow: false,
    },
    {
      title: '角色名称',
      dataIndex: 'rolename',
      width: 120,
    },
    {
      title: '角色编号',
      dataIndex: 'rolenumber',
      width: 120,
    },
    {
      title: '角色状态',
      dataIndex: 'roleenable',
      width: 120,
      customRender: ({ text }) => {
        if (text === '0') {
          return h(Tag, { color: 'red' }, () => '已停用');;
        } else {
          return h(Tag, { color: 'green' }, () => '已启用');
        }
      }
    },
  ]


// 过滤设计
export const RoleSearch: FormSchema[] = [
  {
    field: 'rolename',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'rolenumber',
    label: '角色编号',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 6 },
  },
]

// 表单设计
export const RoleFormSchema: FormSchema[] = [
  {
    field: 'rolename',
    label: '角色名称',
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },
  {
    field: 'rolenumber',
    label: '角色编号',
    component: 'Input',
    required: true,
  },

];
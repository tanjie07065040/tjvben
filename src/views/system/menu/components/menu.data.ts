import { Tag } from "ant-design-vue";
import { h } from "vue";
import { BasicColumn, FormSchema } from "/@/components/Table";


export const MenuColumns: BasicColumn[] =
  [
    {
      title: '主键',
      dataIndex: 'id',
      ifShow: false,
    },
    {
      title: '菜单名称',
      dataIndex: 'menuname',
    },
    {
      title: '菜单别名',
      dataIndex: 'menualiasname',
      ifShow: false
    },
    {
      title: '排序',
      dataIndex: 'menuorder',
      width: 50
    },
    {
      title: '菜单路由',
      dataIndex: 'menuurl',
    },
    {
      title: '菜单图标',
      dataIndex: 'menuicon',
      ifShow: false
    },
    {
      title: '菜单状态',
      dataIndex: 'menuenable',
      width: 80,
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
export const MenuSearch: FormSchema[] = [
  {
    field: 'menuname',
    label: '菜单路由',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'menuurl',
    label: '菜单地址',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 6 },
  },
]

// 表单设计
export const MenuFormSchema: FormSchema[] = [
  {
    field: 'menuname',
    label: '菜单名称',
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },
  {
    field: 'menuurl',
    label: '菜单路由',
    component: 'Input',
    required: true,
  },

];
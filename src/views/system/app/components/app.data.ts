import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn, FormSchema } from "/@/components/Table";

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
      width: 120,
    },
    {
      title: '应用唯一标识',
      dataIndex: 'appid',
      width: 150,
    },
    {
      title: '应用支持',
      dataIndex: 'appsupport',
      width: 120,
      ifShow: false,
    },
    {
      title: '应用类型',
      dataIndex: 'apptype',
      width: 150,
      ifShow: false,
    },
    {
      title: '应用状态',
      dataIndex: 'appenable',
      width: 120,
      customRender: ({ text }) => {
        if (text === '0') {
          return h(Tag, { color: 'red' }, () => '已停用');;
        } else {
          return h(Tag, { color: 'green' }, () => '已启用');
        }
      }
    }
  ]


// 过滤设计
export const AppSearch: FormSchema[] = [
  {
    field: 'appname',
    label: '应用名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'appid',
    label: '应用唯一标识',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 6 },
  },

]

// 表单设计
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
  {
    field: 'appsupport',
    label: '应用支持',
    component: 'Input',
    required: true,
  },
  {
    field: 'apptype',
    label: '应用类型',
    component: 'Input',
    required: true,
  },

];
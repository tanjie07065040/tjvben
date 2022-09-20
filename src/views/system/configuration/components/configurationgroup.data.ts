import { Tag } from "ant-design-vue";
import { h } from "vue";
import { BasicColumn, FormSchema } from "/@/components/Table";


export const ConfigurationGroupColums: BasicColumn[] =
  [
    {
      title: '主键',
      dataIndex: 'id',
      ifShow: false,
    },
    {
      title: '配置组名称',
      dataIndex: 'configurationgroupname',
    },
    {
      title: '状态',
      dataIndex: 'configurationgroupenable',
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
export const ConfigurationGroupSearch: FormSchema[] = [
  {
    field: 'configurationgroupname',
    label: '配置组名称',
    labelWidth: 120,
    component: 'Input',
    colProps: { span: 8 },
  },
]

// 表单设计
export const ConfigurationGroupFormSchema: FormSchema[] = [
  {
    field: 'configurationgroupname',
    label: '配置组名称',
    labelWidth: 120,
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },

];
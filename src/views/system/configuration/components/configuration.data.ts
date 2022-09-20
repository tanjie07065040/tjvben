import { Tag } from "ant-design-vue";
import { h } from "vue";
import { BasicColumn, FormSchema } from "/@/components/Table";


export const ConfigurationColums: BasicColumn[] =
  [
    {
      title: '主键',
      dataIndex: 'id',
      ifShow: false,
    },
    {
      title: '配置名称',
      dataIndex: 'configurationname',
    },
    {
      title: '配置默认值',
      dataIndex: 'configurationdefaultvalue',
    },
    {
      title: '配置实际值',
      dataIndex: 'configurationvalue',
    },
    {
      title: '状态',
      dataIndex: 'configurationenable',
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
export const ConfigurationSearch: FormSchema[] = [
  {
    field: 'configurationname',
    label: '配置名称',
    component: 'Input',
    colProps: { span: 6 },
  },
]

// 表单设计
export const ConfigurationFormSchema: FormSchema[] = [
  {
    field: 'configurationname',
    label: '配置名称',
    labelWidth: 120,
    component: 'Input',
    required: true,
    componentProps: () => {
      return {
        placeholder: '请输入',
      };
    },
  },
  {
    field: 'configurationvalue',
    label: '配置值',
    labelWidth: 120,
    component: 'Input',
    required: true,
  },
  {
    field: 'configurationdefaultvalue',
    label: '配置默认值',
    labelWidth:120,
    component: 'Input',
    required: true,
  },
];
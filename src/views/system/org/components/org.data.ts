import { OrgModel } from "/@/api/system/model/orgModel";
import { FormSchema } from "/@/components/Form";

export const treeData: OrgModel[] = [
  {
    title: '组织机构树',
    key: '100100',
    icon: 'ion:ellipsis-vertical',

    children: [
      {
        title: '研发部',
        key: '100110',
        icon: 'ion:ellipsis-vertical',

        children: [
          {
            title: '研发一部', key: '100111', icon: 'ion:ellipsis-vertical',
          },
          {
            title: '研发二部',
            key: '100112',
            icon: 'ion:ellipsis-vertical',

            children: [
              {
                title: '研发二部队伍一',

                key: '1001121',
                children: [{ title: '研发二部小组', key: '10011211', icon: 'ion:ellipsis-vertical' }],
              },
              { title: '研发二部队伍二', key: '1001122', icon: 'ion:ellipsis-vertical' },
            ],
          },
        ],
      },
      {
        title: '测试部',
        key: '100210',
        icon: 'ion:ellipsis-vertical',
        children: [
          { title: '测试一部', key: '100211', icon: 'ion:ellipsis-vertical' },
          { title: '测试二部', key: '100212', icon: 'ion:ellipsis-vertical' },
        ],
      },
      {
        title: '市场部',
        key: '100310',
        icon: 'ion:ellipsis-vertical',
        children: [
          { title: '市场一部', key: '100311', icon: 'ion:ellipsis-vertical' },
          { title: '市场二部', key: '100312', icon: 'ion:ellipsis-vertical' },
        ],
      },
    ]
  }
];

export const orgFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'title',
    component: 'Input',
    required: true,
  },
  {
    label: '名编号称',
    field: 'key',
    component: 'Input',
    required: true,
  }
];

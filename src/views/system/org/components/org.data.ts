import { FormSchema } from "/@/components/Form";

export const treeData: any[] = [
  {
    orgname: '组织机构树',
    id: '100100',

    children: [
      {
        orgname: '研发部',
        id: '100110',

        children: [
          { orgname: '研发一部', id: '100111' },
          {
            orgname: '研发二部',
            id: '100112',

            children: [
              {
                orgname: '研发二部队伍一',

                id: '1001121',
                children: [{ orgname: '研发二部小组', id: '10011211' }],
              },
              { orgname: '研发二部队伍二', id: '1001122' },
            ],
          },
        ],
      },
      {
        orgname: '测试部',
        id: '100210',

        children: [
          { orgname: '测试一部', id: '100211' },
          { orgname: '测试二部', id: '100212' },
        ],
      },
      {
        orgname: '市场部',
        id: '100310',

        children: [
          { orgname: '市场一部', id: '100311' },
          { orgname: '市场二部', id: '100312' },
        ],
      },
    ]
  }
];

export const orgFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'orgname',
    component: 'Input',
    required: true,
  },
  {
    label: '名编号称',
    field: 'id',
    component: 'Input',
    required: true,
  }
];

import { FormSchema } from "/@/components/Form";

export const treeData: any[] = [
  {
    orgname: 'parent 0',
    id: '0-0',

    children: [
      { orgname: 'leaf', id: '0-0-0' },
      {
        orgname: 'leaf',
        id: '0-0-1',

        children: [
          {
            orgname: 'leaf',

            id: '0-0-0-0',
            children: [{ orgname: 'leaf', id: '0-0-0-0-1' }],
          },
          { orgname: 'leaf', id: '0-0-0-1' },
        ],
      },
    ],
  },
  {
    orgname: 'parent 2',
    id: '1-1',

    children: [
      { orgname: 'leaf', id: '1-1-0' },
      { orgname: 'leaf', id: '1-1-1' },
    ],
  },
  {
    orgname: 'parent 3',
    id: '2-2',

    children: [
      { orgname: 'leaf', id: '2-2-0' },
      { orgname: 'leaf', id: '2-2-1' },
    ],
  },
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

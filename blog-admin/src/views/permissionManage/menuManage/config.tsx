import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { I18nGlobalTranslation } from '/@/hooks/web/useI18n';
import { MPConfirm, MPConfirmConfig } from '/@/components/MPConfirm';

export const columns = (
  t: I18nGlobalTranslation,
  handleEdit: any,
  handleDelete: any,
): BasicColumn[] => {
  return [
    {
      title: '菜单名称',
      dataIndex: 'menu_name',
      width: 200,
      align: 'left',
      customRender: ({ record }) => {
        return t(record.menu_name);
      },
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 50,
      customRender: ({ record }) => {
        return <Icon icon={record.icon} />;
      },
    },
    {
      title: '地址',
      dataIndex: 'path',
    },
    {
      title: '权限标识',
      dataIndex: 'name',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
    },
    {
      title: '重定向',
      dataIndex: 'redirect',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      width: 50,
    },
    {
      title: '状态',
      dataIndex: 'dostatus',
      width: 80,
      customRender: ({ record }) => {
        const status = record.dostatus;
        const enable = ~~status === 0;
        const color = enable ? 'green' : 'red';
        const text = enable ? '启用' : '停用';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
    },
    {
      title: '更新时间',
      dataIndex: 'update_at',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      fixed: 'right',
      customRender: ({ record }) => {
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              handleEdit(record);
            },
          },
          {
            title: '删除',
            btnConfig: {
              danger: true,
            },
            confirmConfig: {
              title: '确定删除吗？',
            },
            onConfirm: () => {
              handleDelete(record);
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

const isDir = (type: number) => type === 0;
// const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menu_name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parent_id',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'key',
        value: 'key',
      },
    },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    required: true,
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    label: '重定向',
    field: 'redirect',
    required: true,
    component: 'Input',
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'path',
    label: '地址',
    component: 'Input',
    required: true,
    // ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    // ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'name',
    label: '权限标识',
    component: 'Input',
  },
  {
    field: 'dostatus',
    label: '状态',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '禁用', value: 1 },
      ],
    },
  },
  {
    field: 'hideChildrenInMenu',
    label: '子菜单是否显示',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 2 },
      ],
    },
    ifShow: ({ values }) => isDir(values.type),
  },
  {
    field: 'hidden',
    label: '菜单栏是否显示',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 2 },
      ],
    },
    ifShow: ({ values }) => !isDir(values.type),
  },
];

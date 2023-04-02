import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { useGo } from '/@/hooks/web/usePage';
import { useSystemManageStoreWithOut } from '/@/store';
import { checkAuthority } from '/@/utils/tools';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '角色名称',
      component: 'Input',
      field: 'name',
      colProps: {
        span: 5,
      },
    },
  ];
};

const tableTitle = (delItem: any): BasicColumn[] => {
  const go = useGo();
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '角色状态',
      dataIndex: 'dostatus',
      format: (val) => {
        return Number(val) === 0 ? '正常' : Number(val) === 1 ? '删除' : '';
      },
    },
    {
      title: '排序号',
      dataIndex: 'order',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      fixed: 'right',
      customRender: (scope) => {
        const { record } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              const systemManageStore = useSystemManageStoreWithOut();
              systemManageStore.setEditRole(record);

              checkAuthority('RoleEdit', () => {
                go('roleEdit');
              });
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
              delItem(record);
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };

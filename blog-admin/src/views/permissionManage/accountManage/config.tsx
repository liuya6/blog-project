import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { MImg } from '/@/components/MImg';

import { useGo } from '/@/hooks/web/usePage';
import { useSystemManageStoreWithOut } from '/@/store';
import { checkAuthority } from '/@/utils/tools';
// import { formatToDateTime } from '/@/utils/dateUtil';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '用户账号',
      component: 'Input',
      field: 'account',
      colProps: {
        span: 5,
      },
    },
    {
      field: 'sex',
      label: '性别',
      component: 'Select',
      colProps: {
        span: 5,
      },
      componentProps: {
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
    },
  ];
};

const tableTitle = (): BasicColumn[] => {
  const go = useGo();

  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户账号',
      dataIndex: 'account',
    },
    {
      title: '用户姓名',
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'img',
      customRender: (scope) => {
        const { record } = scope;
        const imgSrc = record.img;
        return <MImg imgData={imgSrc} />;
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      format: (val) => {
        return Number(val) === 1 ? '男' : Number(val) === 2 ? '女' : '';
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'name',
      customRender: (scope) => {
        const { record } = scope;
        return record.role_info.name;
      },
    },

    {
      title: '操作',
      dataIndex: 'operate',
      fixed: 'right',
      width: 200,
      customRender: (scope) => {
        const { record } = scope;

        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              const systemManageStore = useSystemManageStoreWithOut();
              systemManageStore.setEditAccount(record);
              checkAuthority('AccountEdit', () => {
                go('accountEdit');
              });
            },
          },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };

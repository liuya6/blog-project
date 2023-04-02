import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';

import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { Ref } from 'vue';

const schemas = (): FormSchema[] => {
  return [
    // {
    //   label: '游戏名称',
    //   component: 'Input',
    //   field: 'keywords',
    //   colProps: {
    //     span: 5,
    //   },
    // },
  ];
};

const tableTitle = (
  openModal: any,
  isEdit: Ref<boolean>,
  delItem: (record: any) => void,
): BasicColumn[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '类型名称',
      dataIndex: 'cate',
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
      title: '操作',
      dataIndex: 'opera',
      customRender: (scope) => {
        const { record } = scope;
        const options: MPConfirmConfig[] = [
          {
            title: '编辑',
            onClick: () => {
              isEdit.value = true;
              openModal(true, record);
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

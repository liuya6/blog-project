import { Ref } from 'vue';
import dayjs from 'dayjs';

import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { MImg } from '/@/components/MImg';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import IpGetArea from '/@/components/IpGetArea/index.vue';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '用户昵称',
      component: 'Input',
      field: 'nickname',
      colProps: {
        span: 4,
      },
    },
    {
      label: '用户ID',
      component: 'Input',
      field: 'id',
      colProps: {
        span: 4,
      },
    },
    {
      label: '注册时间',
      component: 'RangePicker',
      field: 'registerTime',
      componentProps: {
        showTime: {
          defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('23:59:59', 'HH:mm:ss')],
        },
      },
      colProps: {
        span: 6,
      },
    },
  ];
};

const tableTitle = (openModal: any, isEdit: Ref<boolean>): BasicColumn[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户头像',
      dataIndex: 'headimg',
      customRender: (scope) => {
        const { record } = scope;
        return <MImg imgData={record.headimg} />;
      },
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: 'ip/地区',
      dataIndex: 'ip',
      helpMessage: '点击查看ip所在地区',
      customRender: ({ record }) => {
        return <IpGetArea ip={record.ip} />;
      },
    },
    {
      title: '平台',
      dataIndex: 'platform',
      format: (val) => (Number(val) === 1 ? 'IOS' : Number(val) === 2 ? '安卓' : ''),
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
    },
    {
      title: '最近登录时间',
      dataIndex: 'last_login_time',
    },
    // {
    //   title: '绑定邮箱',
    //   dataIndex: 'mail',
    // },
    {
      title: '账户余额',
      dataIndex: 'diamond',
    },
    {
      title: '操作',
      dataIndex: 'opera',
      fixed: 'right',
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
          // {
          //   title: '删除',
          //   btnConfig: {
          //     danger: true,
          //   },
          //   confirmConfig: {
          //     title: '确定删除吗？',
          //   },
          //   onConfirm: () => {
          //     delItem(record);
          //   },
          // },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };

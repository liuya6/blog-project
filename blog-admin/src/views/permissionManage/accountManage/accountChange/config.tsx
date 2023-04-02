import { FormSchema } from '/@/components/Form';

import { useSystemManageStoreWithOut } from '/@/store';
import { useRoute } from 'vue-router';
import { getSelectSearchConfig } from '/@/utils/tools';
import { permissionService } from '/@/api';

const isEdit = () => {
  const route = useRoute();
  return route.name === 'AccountEdit';
};

const schemas = (): FormSchema[] => {
  const systemManageStore = useSystemManageStoreWithOut();

  const editAccount = systemManageStore.editAccount;

  // const show = () => {
  //   return Boolean(gameManageStore.editGame && isEdit());
  // };
  const setDefaultValue = (params: any) => {
    return isEdit() && editAccount && editAccount[params] !== null ? editAccount[params] : '';
  };
  return [
    {
      label: '用户账号',
      field: 'account',
      component: 'Input',
      required: true,
      defaultValue: setDefaultValue('account'),
      componentProps: {
        maxLength: 20,
      },
    },
    {
      label: '密码',
      field: 'password',
      component: 'InputPassword',
      componentProps: {
        maxLength: 11,
      },
      required: !isEdit(),
      defaultValue: setDefaultValue('password'),
    },
    {
      label: '用户姓名',
      field: 'nickname',
      component: 'Input',
      defaultValue: setDefaultValue('nickname'),
      required: true,
    },
    {
      label: '用户头像',
      field: 'img',
      component: 'UploadImage',
      defaultValue: setDefaultValue('img'),
      componentProps: {
        limitSize: 1,
      },
      colProps: {
        span: 23,
      },
    },
    {
      label: '性别',
      field: 'sex',
      component: 'RadioGroup',
      defaultValue: Number(setDefaultValue('sex')),
      componentProps: {
        options: [
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
        ],
      },
    },
    {
      label: '手机号码',
      field: 'phone',
      component: 'Input',
      defaultValue: setDefaultValue('phone'),
      componentProps: {
        maxLength: 11,
      },
      rules: [
        {
          validator: async (_, value) => {
            if (value && !/1[2|3|4|5|6|7|8|9]\d{9}/.test(value)) {
              return Promise.reject('请输入正确的手机号');
            }
            return Promise.resolve();
          },
        },
      ],
    },
    {
      label: '分配角色',
      field: 'role_id',
      component: 'ApiSelect',
      componentProps: () => {
        return {
          ...getSelectSearchConfig(),
          api: permissionService.getRoleList,
          params: { page: 1, page_size: 1000 },
          resultField: 'data',
          labelField: 'name',
          valueField: 'id',
        };
      },
      defaultValue: setDefaultValue('role_id'),
      required: true,
    },

    // {
    //   label: '备注',
    //   field: 'remark',
    //   component: 'InputTextArea',
    //   defaultValue: setDefaultValue('remark'),
    //   rightContentWidth: 380,
    //   componentProps: {
    //     maxLength: 20,
    //   },
    // },
  ];
};

export { schemas };

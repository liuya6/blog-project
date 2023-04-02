import { FormSchema } from '/@/components/Form';
import RouterTree from './components/RouterTree.vue';

import { useSystemManageStoreWithOut } from '/@/store';
import { useRoute } from 'vue-router';

const isEdit = () => {
  const route = useRoute();
  return route.name === 'RoleEdit';
};

const schemas = (): FormSchema[] => {
  const systemManageStore = useSystemManageStoreWithOut();

  const editRole = systemManageStore.editRole;
  // const show = () => {
  //   return Boolean(editRole && isEdit());
  // };
  const setDefaultValue = (params: any) => {
    return isEdit() && editRole && editRole[params] !== null ? editRole[params] : '';
  };

  return [
    {
      label: '角色名称',
      field: 'name',
      component: 'Input',
      required: true,
      defaultValue: setDefaultValue('name'),
      componentProps: {
        maxLength: 10,
      },
    },
    {
      label: '排序号',
      field: 'order',
      component: 'InputNumber',
      defaultValue: setDefaultValue('order'),
      componentProps: {
        min: 1,
      },
      required: true,
      colProps: {
        span: 8,
      },
    },
    {
      label: '角色状态',
      field: 'dostatus',
      component: 'RadioGroup',
      rightContentWidth: 380,
      defaultValue: setDefaultValue('dostatus'),
      componentProps: {
        options: [
          {
            label: '正常',
            value: 0,
          },
          {
            label: '停用',
            value: 1,
          },
        ],
      },
    },

    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
      defaultValue: setDefaultValue('remark'),
    },
    {
      label: '角色权限配置',
      field: 'permissions',
      component: 'Render',
      defaultValue: setDefaultValue('permissions'),
      required: true,
      render: ({ model, field }) => {
        return (
          <RouterTree
            defaultValue={model[field]}
            onChange={({ checkKeys, halfCheckedKeys }) => {
              const val = [...new Set(checkKeys.concat(halfCheckedKeys))];
              model[field] = val;
            }}
          />
        );
      },
    },
  ];
};

export { schemas };

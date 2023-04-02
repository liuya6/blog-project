import { FormSchema } from '/@/components/Form';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '类型名称',
      field: 'cate',
      component: 'Input',
      required: true,
    },
    {
      label: '备注',
      field: 'remark',
      component: 'Input',
    },
  ];
};

export { schemas };

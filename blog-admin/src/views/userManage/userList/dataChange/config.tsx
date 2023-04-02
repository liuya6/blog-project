import { FormSchema } from '/@/components/Form';

const schemas = (): FormSchema[] => {
  return [
    {
      label: '余额',
      field: 'diamond',
      component: 'InputNumber',
    },
    {
      label: '备注',
      field: 'remark',
      component: 'InputTextArea',
    },
  ];
};

export { schemas };

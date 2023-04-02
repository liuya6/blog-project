import { FormSchema } from '/@/components/Form';
import { computed, ref, unref } from 'vue';
import { selectService } from '/@/api';

const titleRef = ref('');
const searchParams = computed(() => {
  return { title: unref(titleRef) };
});

const schemas = (): FormSchema[] => {
  return [
    {
      label: '视频名称',
      field: 'title',
      component: 'Input',
      required: true,
    },
    {
      label: '视频封面',
      field: 'cover',
      component: 'UploadImage',
      colProps: {
        span: 23,
      },
      required: true,
    },
    {
      label: '视频类型',
      field: 'cate_id',
      component: 'ApiSelect',
      required: true,
      componentProps: () => {
        return {
          api: selectService.selectVideoType,
          params: unref(searchParams),
          showSearch: true,
          filterOption: false,
          resultField: 'data',
          labelField: 'cate',
          valueField: 'id',
          onSearch: (value: string) => {
            titleRef.value = value;
          },
        };
      },
    },
    // {
    //   label: '视频状态',
    //   field: 'dostatus',
    //   component: 'Switch',
    // },
    {
      label: '排序号',
      field: 'sort',
      component: 'InputNumber',
      required: true,
      componentProps: {
        min: 1,
      },
    },
    // {
    //   label: '上传视频',
    //   field: 'element_url',
    //   component: 'UploadFile',
    //   colProps: {
    //     span: 23,
    //   },
    //   componentProps: {},
    // },
  ];
};

export { schemas };

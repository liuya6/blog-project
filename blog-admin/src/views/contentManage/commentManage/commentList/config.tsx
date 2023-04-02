import { Ref, ref, unref, computed } from 'vue';
import { Switch } from 'ant-design-vue';
import { FormSchema } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { MPConfirmConfig, MPConfirm } from '/@/components/MPConfirm';
import { MImg } from '/@/components/MImg';
import { MVideo } from '/@/components/MVideo';

import { selectService } from '/@/api';

const titleRef = ref('');
const searchParams = computed(() => {
  return { title: unref(titleRef) };
});

const schemas = (): FormSchema[] => {
  return [
    {
      label: '视频名称',
      component: 'Input',
      field: 'title',
      colProps: {
        span: 5,
      },
    },
    {
      label: '视频类型',
      component: 'ApiSelect',
      field: 'cate_id',
      colProps: {
        span: 5,
      },
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
  ];
};

const tableTitle = (
  openModal: any,
  isEdit: Ref<boolean>,
  changeStatus: (id: number, dostatus: number) => void,
): BasicColumn[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '视频名称',
      dataIndex: 'title',
      showTips: true,
    },
    {
      title: '视频类别',
      dataIndex: 'cate',
      customRender: (scope) => {
        const { record } = scope;
        const cate = record.cate;
        return !!cate ? cate.cate : '';
      },
    },
    {
      title: '视频链接',
      dataIndex: 'play_addr',
      customRender: (scope) => {
        const { record } = scope;
        return <MVideo src={record.play_addr} />;
      },
    },
    {
      title: '状态',
      dataIndex: 'dostatus',
      customRender: (scope) => {
        const { record } = scope;
        return (
          <Switch
            checked={Number(record.dostatus) === 0}
            onClick={() => changeStatus(record.id, Number(record.dostatus) === 0 ? 1 : 0)}
          />
        );
      },
    },
    {
      title: '视频封面',
      dataIndex: 'cover',
      customRender: (scope) => {
        const { record } = scope;
        return <MImg imgData={record.cover} />;
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '添加日期',
      dataIndex: 'created_at',
    },
    // {
    //   title: '更新时间',
    //   dataIndex: 'create_time',
    // },
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
          //     // delItem(record);
          //   },
          // },
        ];
        return <MPConfirm options={options} />;
      },
    },
  ];
};

export { schemas, tableTitle };

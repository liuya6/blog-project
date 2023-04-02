// 用于配置部分组件的通用配置，无需修改组件

import type { SorterResult } from '../components/Table';

export default {
  // 基本表设置
  table: {
    // 表单接口请求通用配置
    fetchSetting: {
      // 传给后台的当前页面的字段名
      pageField: 'page',
      // 后台显示的每页的数字字段名称
      sizeField: 'page_size',
      // 接口返回的表单数据的字段名
      listField: 'data.data',
      // 接口字段名返回的表总数
      totalField: 'data.count',
    },
    // 可选择的页数
    pageSizeOptions: ['10', '20', '30', '50', '100'],
    // 一页默认显示数量
    defaultPageSize: 20,
    // 默认尺寸
    defaultSize: 'small',
    // 自定义通用排序功能
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          // 传递给后端的排序字段
          field,
          // 传递给后台的排序方法 asc/desc
          order,
        };
      } else {
        return {};
      }
    },
    // 自定义通用过滤功能
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  // 滚动条设置
  scrollbar: {
    // 是否使用原生滚动条
    // 打开后，menu、modal、drawer都会将弹出的滚动条改为native
    native: true,
  },
};

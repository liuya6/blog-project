import { h } from 'vue';
import { TableDataTips } from '/@/components/MTips';

interface Params {
  text: string;
  record: Recordable;
  index: number;
}

export function renderDefaultColumns(column) {
  return ({ text, record, index }: Params) => {
    return h(TableDataTips, {
      text,
      record,
      index,
      column,
    });
  };
}

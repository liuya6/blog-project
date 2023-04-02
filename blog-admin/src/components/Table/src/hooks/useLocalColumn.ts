import { useRoute } from 'vue-router';
import { createLocalStorage } from '/@/utils/cache';

type SetLocalKey = 'checkAll' | 'checkIndex' | 'checkSelect' | 'columns';
interface LocalMemory {
  checkAll: boolean;
  checkIndex: boolean;
  checkSelect: boolean;
  columns: any[];
}

const ls = createLocalStorage({
  prefixKey: 'COLUMN_SETTING_',
});

function useLocalColumn(id: string) {
  let tableId = id;
  if (!tableId) {
    const route = useRoute();
    typeof route.name === 'string' ? (tableId = route.name) : (tableId = route.path);
  }

  const defaultLocalValue = () => {
    return ls.get(tableId);
  };

  let localMemory: Partial<LocalMemory> = {
    // checkAll: true,
    // checkIndex: false,
    // checkSelect: false,
    // columns: [],
  };

  if (defaultLocalValue()) {
    localMemory = defaultLocalValue();
  }

  function setLocalData(key: SetLocalKey, value: any) {
    localMemory[key] = value;
    ls.set(tableId, localMemory);
  }

  return {
    localMemory,
    setLocalData,
  };
}

export { useLocalColumn };

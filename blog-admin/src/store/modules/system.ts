import { defineStore } from 'pinia';
import { store } from '/@/store';
import { Persistent } from '/@/utils/cache/persistent';

import {
  SYSTEM_ROLE_MANAGE_EDIT_ROLE,
  SYSTEM_ACCOUNT_MANAGE_EDIT_ACCOUNT,
} from '/@/enums/cacheEnum';

interface SystemManageState {
  editRole: any;
  editAccount: any;
}

export const useSystemManageStore = defineStore({
  id: 'system',
  state: (): SystemManageState => ({
    editRole: Persistent.getLocal(SYSTEM_ROLE_MANAGE_EDIT_ROLE),
    editAccount: Persistent.getLocal(SYSTEM_ACCOUNT_MANAGE_EDIT_ACCOUNT),
  }),
  getters: {},
  actions: {
    setEditRole(payload) {
      this.editRole = payload;
      Persistent.setLocal(SYSTEM_ROLE_MANAGE_EDIT_ROLE, this.editRole);
    },
    setEditAccount(payload) {
      this.editAccount = payload;
      Persistent.setLocal(SYSTEM_ACCOUNT_MANAGE_EDIT_ACCOUNT, this.editAccount);
    },
  },
});

// 在设置之外使用
export function useSystemManageStoreWithOut() {
  return useSystemManageStore(store);
}

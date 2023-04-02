import { defineStore } from 'pinia';
import { store } from '/@/store';
import { Persistent } from '/@/utils/cache/persistent';
import { CONTENT_MANAGE_PLAN_EDIT, CONTENT_MANAGE_MATCH_COLLECTION_EDIT } from '/@/enums/cacheEnum';

interface ContentManageState {
  editPlan: any;
  editMatch: any;
}

export const useContentManageStore = defineStore({
  id: 'contentManage',
  state: (): ContentManageState => ({
    editPlan: Persistent.getLocal(CONTENT_MANAGE_PLAN_EDIT),
    editMatch: Persistent.getLocal(CONTENT_MANAGE_MATCH_COLLECTION_EDIT),
  }),
  getters: {},
  actions: {
    setPlan(payload) {
      this.editPlan = payload;
      Persistent.setLocal(CONTENT_MANAGE_PLAN_EDIT, this.editPlan);
    },
    setMatchCollection(payload) {
      this.editMatch = payload;
      Persistent.setLocal(CONTENT_MANAGE_MATCH_COLLECTION_EDIT, this.editMatch);
    },
  },
});

// 在设置之外使用
export function useContentManageStoreWithOut() {
  return useContentManageStore(store);
}

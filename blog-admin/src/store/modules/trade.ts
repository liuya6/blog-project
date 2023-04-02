import { defineStore } from 'pinia';
import { store } from '/@/store';
import { Persistent } from '/@/utils/cache/persistent';
import {
  TRADE_ORDER_MANAGE_EDIT_ORDER,
  TRADE_COUPON_EDIT,
  TRADE_PLAN_PREVIEW,
} from '/@/enums/cacheEnum';

interface TradeManageState {
  editOrder: any;
  editCoupon: any;
  planPreviewData: any;
}

export const useTradeManageStore = defineStore({
  id: 'tradeManage',
  state: (): TradeManageState => ({
    editOrder: Persistent.getLocal(TRADE_ORDER_MANAGE_EDIT_ORDER),
    editCoupon: Persistent.getLocal(TRADE_COUPON_EDIT),
    planPreviewData: Persistent.getLocal(TRADE_PLAN_PREVIEW),
  }),
  getters: {},
  actions: {
    setOrder(payload) {
      this.editOrder = payload;
      Persistent.setLocal(TRADE_ORDER_MANAGE_EDIT_ORDER, this.editOrder);
    },
    setCoupon(payload) {
      this.editCoupon = payload;
      Persistent.setLocal(TRADE_COUPON_EDIT, this.editCoupon);
    },
    setPlanPreview(payload) {
      this.planPreviewData = payload;
      Persistent.setLocal(TRADE_PLAN_PREVIEW, this.planPreviewData);
    },
  },
});

// 在设置之外使用
export function useTradeManageStoreWithOut() {
  return useTradeManageStore(store);
}

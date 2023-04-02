import { defHttp } from '/@/utils/http/axios';
import { tradeConst } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 订阅
export function subscribeList(params) {
  return defHttp.get({
    url: tradeConst.TRADE_SUBSCRIBE_LIST,
    params,
  });
}
export function subscribeAdd(params) {
  return defHttp.post({
    url: tradeConst.TRADE_SUBSCRIBE_ADD,
    params,
  });
}
export function subscribeEdit(params) {
  return defHttp.post({
    url: tradeConst.TRADE_SUBSCRIBE_EDIT,
    params,
  });
}
export function subscribeDel(params) {
  return defHttp.get({
    url: tradeConst.TRADE_SUBSCRIBE_DEL,
    params,
  });
}
export function subscribeChangeStatus(params) {
  return defHttp.get({
    url: tradeConst.TRADE_SUBSCRIBE_CHANGE_STATUS,
    params,
  });
}

// 充值
export function rechargeList(params) {
  return defHttp.get({
    url: tradeConst.TRADE_RECHARGE_LIST,
    params,
  });
}
export function rechargeAdd(params) {
  return defHttp.post({
    url: tradeConst.TRADE_RECHARGE_ADD,
    params,
  });
}
export function rechargeEdit(params) {
  return defHttp.post({
    url: tradeConst.TRADE_RECHARGE_EDIT,
    params,
  });
}
export function rechargeDel(params) {
  return defHttp.get({
    url: tradeConst.TRADE_RECHARGE_DEL,
    params,
  });
}
export function rechargeChangeStatus(params) {
  return defHttp.get({
    url: tradeConst.TRADE_RECHARGE_CHANGE_STATUS,
    params,
  });
}

export function ipToArea(params) {
  return defHttp.get({
    // headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: `${tradeConst.TRADE_IP_TO_AREA}/${params}`,
  });
}

export function rechargeRecordList(params) {
  return defHttp.get({
    url: tradeConst.TRADE_RECHARGE_RECORD,
    params,
  });
}

// 订单
export function orderList(params) {
  return defHttp.get({
    url: tradeConst.TRADE_ORDER_LIST,
    params,
  });
}

// 方案发布
export function planRelease(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: tradeConst.TRADE_PLAN_PUSH,
    params,
  });
}

// 修改设置销量
export function orderCountChange(params) {
  return defHttp.put({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: `${tradeConst.TRADE_PLAN_SET_ORDER_COUNT_CHANGE}/${params.id}`,
    params,
  });
}

// 修改方案结果
export function planResultChange(params) {
  return defHttp.put({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: `${tradeConst.TRADE_PLAN_RESULT_CHANGE}/${params.id}`,
    params,
  });
}
// 修改方案状态
export function planWithChange(params) {
  return defHttp.put({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: `${tradeConst.TRADE_PLAN_WITH_CHANGE}/${params.id}`,
    params,
  });
}

// 优惠券
export function couponList(params) {
  return defHttp.get({
    url: tradeConst.COUPON_LIST,
    params,
  });
}

export function couponAdd(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: tradeConst.COUPON_ADD,
    params,
  });
}

export function couponEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: tradeConst.COUPON_EDIT,
    params,
  });
}

export function couponDel(params) {
  return defHttp.get({
    url: tradeConst.COUPON_DEL,
    params,
  });
}

export function couponChangeStatus(params) {
  return defHttp.get({
    url: tradeConst.COUPON_CHANGE_STATUS,
    params,
  });
}
export function couponLogList(params) {
  return defHttp.get({
    url: tradeConst.COUPON_LOG_LIST,
    params,
  });
}

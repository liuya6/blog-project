import { defHttp } from '/@/utils/http/axios';
import { dashboardConst } from './const';

// todo 分析页
//列表
export function dashboardAnalysis(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_ANALYSIS,
    params,
  });
}
//导出
export function analysisExcle(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_ANALYSIS_EXCLE,
    params,
  });
}
export function analysisExcleUrl(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_ANALYSIS_EXCLE_URL,
    params,
  });
}
export function dashboardAnalysisTop() {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_ANALYSIS_TOP,
  });
}

// todo 检测页
export function dashboardMonitor(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_MONITOR,
    params,
  });
}
// 导出

export function monitorExcle(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_MONITOR_EXCLE,
    params,
  });
}
export function monitorExcleUrl(params) {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_MONITOR_EXCLE_URL,
    params,
  });
}
export function dashboardMonitorTop() {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_MONITOR_TOP,
  });
}

// todo 收益页
export function dashboardSaleTotal() {
  return defHttp.get({
    url: dashboardConst.DASHBOARD_SALE_TOTAL,
  });
}

// todo 留存页
// 列表
export function reportRetention(params) {
  return defHttp.get({
    url: dashboardConst.REPORT_RETENTION,
    params,
  });
}

// todo 核心数据
// 核心数据
export function reportCore() {
  return defHttp.get({
    url: dashboardConst.REPORT_CORE,
  });
}
// 核心数据列表
export function reportCoreList(params) {
  return defHttp.get({
    url: dashboardConst.REPORT_CORE_LIST,
    params,
  });
}

// todo 付费数据
// 付费数据
export function reportPay() {
  return defHttp.get({
    url: dashboardConst.REPORT_PAY,
  });
}
// 柱状图
export function reportPayBar() {
  return defHttp.get({
    url: dashboardConst.REPORT_PAY_BAR,
  });
}
// bing状图
export function reportPayPie() {
  return defHttp.get({
    url: dashboardConst.REPORT_PAY_PIE,
  });
}
//付费数据列表
export function reportPayList(params) {
  return defHttp.get({
    url: dashboardConst.REPORT_PAY_LIST,
    params,
  });
}

// todo 增长数据
// 增长数据
export function reportIncrease() {
  return defHttp.get({
    url: dashboardConst.REPORT_INCREASE,
  });
}
// 增长数据列表
export function reportIncrList(params) {
  return defHttp.get({
    url: dashboardConst.REPORT_INCR_LIST,
    params,
  });
}
// 增长数据折线图
export function reportIncrLine() {
  return defHttp.get({
    url: dashboardConst.REPORT_INCR_LINE,
  });
}
// todo 转化率
// 注册转化率
export function reportRegisterRate() {
  return defHttp.get({
    url: dashboardConst.REPORT_REGISTER_CONVERT,
  });
}

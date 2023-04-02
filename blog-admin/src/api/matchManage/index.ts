import { defHttp } from '/@/utils/http/axios';
import { matchManage } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 比赛管理列表
export function matchManageInfo(params) {
  return defHttp.get({
    url: matchManage.MATCH_MANAGE_DETAILS,
    params,
  });
}

// 修改直播配置
export function changeLiveConfig(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: matchManage.MATCH_MANAGE_LIVE_CONFIG_CHANGE,
    params,
  });
}

// 获取直播配置
export function getLiveConfig(params) {
  return defHttp.get({
    url: matchManage.MATCH_MANAGE_LIVE_CONFIG,
    params,
  });
}

// 获取主播列表
export function getAuthor(params) {
  return defHttp.get({
    url: matchManage.MATCH_MANAGE_AUTHOR_LIST,
    params,
  });
}

// 录播列表
export function videoRecord(params) {
  return defHttp.get({
    url: matchManage.MATCH_MANAGE_VIDEO_RECORD_LIST,
    params,
  });
}

// 录播开关
export function videoRecordSwitch(params) {
  return defHttp.post({
    url: matchManage.MATCH_MANAGE_VIDEO_RECORD_SWITCH,
    params,
  });
}

// 录播删除
export function videoRecordDel(params) {
  return defHttp.get({
    url: matchManage.MATCH_MANAGE_VIDEO_RECORD_DEL,
    params,
  });
}

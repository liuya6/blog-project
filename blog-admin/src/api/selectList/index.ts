import { defHttp } from '/@/utils/http/axios';
import { selectConst } from './const';

// 视频类型下拉
export function selectVideoType(params) {
  return defHttp.get({
    url: selectConst.SELECT_VIDEO_TYPE,
    params,
  });
}

// 方案标签下拉
export function selectPlanTagList(params) {
  return defHttp.get({
    url: selectConst.SELECT_PLAN_TAG_TYPE,
    params,
  });
}

// 所属联赛下拉
export function selectMatchList(params) {
  return defHttp.get({
    url: selectConst.SELECT_MATCH_LIST,
    params,
  });
}

// 专家下拉
export function selectExpertList(params) {
  return defHttp.get({
    url: selectConst.SELECT_EXPERT_LIST,
    params,
  });
}

// 专家标签下拉
export function selectExpertTagList(params) {
  return defHttp.get({
    url: selectConst.SELECT_EXPERT_TAG_LIST,
    params,
  });
}

import { defHttp } from '/@/utils/http/axios';
import { contentConst } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// todo 视频管理
export function contentVideoList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_VIDEO_LIST,
    params,
  });
}

export function contentVideoEdit(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_VIDEO_EDIT,
    params,
  });
}

export function contentVideoChangeStatus(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_VIDEO_CHANGE_STATUS,
    params,
  });
}

export function contentVideoDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_VIDEO_DEL,
    params,
  });
}

// todo 视频类型
export function contentVideoTypeList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_VIDEO_TYPE_LIST,
    params,
  });
}
export function contentVideoTypeAdd(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_VIDEO_TYPE_ADD,
    params,
  });
}
export function contentVideoTypeEdit(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_VIDEO_TYPE_EDIT,
    params,
  });
}
export function contentVideoTypeDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_VIDEO_TYPE_DEL,
    params,
  });
}

// todo 轮播图
export function contentBannerList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_BANNERS_LIST,
    params,
  });
}

export function contentBannerAdd(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_BANNERS_ADD,
    params,
  });
}

export function contentBannerEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_BANNERS_EDIT,
    params,
  });
}

export function contentBannerDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_BANNERS_DEL,
    params,
  });
}

export function contentBannerChangeStatus(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_BANNERS_CHANGE_STATUS,
    params,
  });
}

// todo 轮播图类型
export function contentBannersTypeList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_BANNERS_TYPE_LIST,
    params,
  });
}

export function contentBannersTypeAdd(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_BANNERS_TYPE_ADD,
    params,
  });
}

export function contentBannersTypeEdit(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_BANNERS_TYPE_EDIT,
    params,
  });
}

export function contentBannersTypeDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_BANNERS_TYPE_DEL,
    params,
  });
}

// todo 方案列表
export function contentPlanList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_PLAN_LIST,
    params,
  });
}

export function contentPlanAdd(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_PLAN_ADD,
    params,
  });
}

export function contentPlanEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_PLAN_EDIT,
    params,
  });
}

export function contentPlanDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_PLAN_DELETE,
    params,
  });
}

export function contentPlanTranslate(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_PLAN_TRANSLATE,
    params,
  });
}

export function contentPlanTranslateEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: contentConst.CONTENT_MANAGE_PLAN_TRANSLATE_EDIT,
    params,
  });
}

// todo 方案标签
// 方案标签
export function contentPlanTagList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_PLAN_TAG_LIST,
    params,
  });
}

export function contentPlanTagAdd(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_PLAN_TAG_ADD,
    params,
  });
}

export function contentPlanTagEdit(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_PLAN_TAG_EDIT,
    params,
  });
}

export function contentPlanTagDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_PLAN_TAG_DEL,
    params,
  });
}

// todo 联赛包
export function contentMatchList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_MATCH_COLLECTION_LIST,
    params,
  });
}

export function contentMatchAdd(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_MATCH_COLLECTION_ADD,
    params,
  });
}

export function contentMatchEdit(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_MATCH_COLLECTION_EDIT,
    params,
  });
}

export function contentMatchDel(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_MATCH_COLLECTION_DEL,
    params,
  });
}

// 比赛列表
export function allMatchList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_MATCH_LIST,
    params,
  });
}

// 新闻管理
export function getNewsList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_NEWS_LIST,
    params,
  });
}

export function addNewsList(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_NEWS_ADD,
    params,
  });
}

export function editNewsList(params) {
  return defHttp.post({
    url: contentConst.CONTENT_MANAGE_NEWS_EDIT,
    params,
  });
}

export function delNewsList(params) {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_NEWS_DEL,
    params,
  });
}

export function getNewsCateList() {
  return defHttp.get({
    url: contentConst.CONTENT_MANAGE_NEWS_CATE,
  });
}

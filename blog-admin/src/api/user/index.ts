import { defHttp } from '/@/utils/http/axios';
import { userConst } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

export function toLogin(params, mode) {
  return defHttp.post(
    {
      url: userConst.LOGIN_TO,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 用户管理 & 专家管理
export function userList(params) {
  return defHttp.get({
    url: userConst.USER_MANAGE_USER_MANAGE_LIST,
    params,
  });
}
export function userAdd(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: userConst.USER_MANAGE_USER_MANAGE_ADD,
    params,
  });
}
export function userEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: userConst.USER_MANAGE_USER_MANAGE_EDIT,
    params,
  });
}
export function userDel(params) {
  return defHttp.get({
    url: userConst.USER_MANAGE_USER_MANAGE_DEL,
    params,
  });
}
// 专家标签
export function expertTagList(params) {
  return defHttp.get({
    url: userConst.USER_MANAGE_EXPERT_TAG_LIST,
    params,
  });
}
export function expertTagAdd(params) {
  return defHttp.post({
    url: userConst.USER_MANAGE_EXPERT_TAG_ADD,
    params,
  });
}
export function expertTagEdit(params) {
  return defHttp.post({
    url: userConst.USER_MANAGE_EXPERT_TAG_EDIT,
    params,
  });
}
export function expertTagDel(params) {
  return defHttp.get({
    url: userConst.USER_MANAGE_EXPERT_TAG_DEL,
    params,
  });
}

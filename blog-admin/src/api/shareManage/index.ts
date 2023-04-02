import { defHttp } from '/@/utils/http/axios';
import { shareManage } from './const';
// import { ContentTypeEnum } from '/@/enums/httpEnum';

// 邀请列表
export function inviteList(params) {
  return defHttp.get({
    url: shareManage.SHARE_MANAGE_INVITE_LIST,
    params,
  });
}

// 邀请规则
export function inviteRule() {
  return defHttp.get({
    url: shareManage.SHARE_MANAGE_INVITE_RULE,
  });
}

// 邀请规则编辑
export function inviteRuleEdit(params) {
  return defHttp.post({
    // headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: shareManage.SHARE_MANAGE_INVITE_RULE_EDIT,
    params,
  });
}

// 奖品配置列表
export function prizeConfig() {
  return defHttp.get({
    url: shareManage.SHARE_MANAGE_PRIZE_CONFIG,
  });
}

// 奖品配置编辑
export function prizeConfigEdit(params) {
  return defHttp.post({
    url: shareManage.SHARE_MANAGE_PRIZE_CONFIG_EDIT,
    params,
  });
}

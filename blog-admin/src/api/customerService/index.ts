import { defHttp } from '/@/utils/http/axios';
import { customerServiceManage } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// 比赛管理列表
export function customerServiceList(params) {
  return defHttp.get({
    url: customerServiceManage.CUSTOMER_SERVICE_MANAGE_API,
    params,
  });
}

// 比赛管理新增
export function customerServiceAdd(params) {
  return defHttp.post({
    url: customerServiceManage.CUSTOMER_SERVICE_MANAGE_API,
    params,
  });
}

// 比赛管理编辑
export function customerServiceEdit(params) {
  return defHttp.put({
    url: `${customerServiceManage.CUSTOMER_SERVICE_MANAGE_API}/${params.id}`,
    params,
  });
}

// 比赛管理删除
export function customerServiceDel(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: customerServiceManage.CUSTOMER_SERVICE_MANAGE_DEL,
    params,
  });
}

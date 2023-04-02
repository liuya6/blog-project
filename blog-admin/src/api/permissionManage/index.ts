import { defHttp } from '/@/utils/http/axios';
import { permissionManageConst } from './const';
import { ContentTypeEnum } from '/@/enums/httpEnum';

// todo 员工管理
// 列表
export function getAccountList(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_ACCOUNT_LIST,
    params,
  });
}
// 删除
export function accountDel(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_ACCOUNT_DEL,
    params,
  });
}
// 添加
export function accountAdd(params) {
  return defHttp.post({
    url: permissionManageConst.PERMISSION_MANAGE_ACCOUNT_ADD,
    params,
  });
}
//编辑
export function accountEdit(params) {
  return defHttp.post({
    url: permissionManageConst.PERMISSION_MANAGE_ACCOUNT_EDIT,
    params,
  });
}
// 用户信息-权限
export function accountInfo() {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_ACCOUNT_INFO,
  });
}

//todo 角色管理
//列表
export function getRoleList(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_ROLE_LIST,
    params,
  });
}
// 删除
export function roleDel(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_ROLE_DEL,
    params,
  });
}
// 添加
export function roleAdd(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: permissionManageConst.PERMISSION_MANAGE_ROLE_ADD,
    params,
  });
}
//编辑
export function roleEdit(params) {
  return defHttp.post({
    headers: { 'Content-Type': ContentTypeEnum.JSON },
    url: permissionManageConst.PERMISSION_MANAGE_ROLE_EDIT,
    params,
  });
}

// todo 菜单管理
//列表
export function getMenuList() {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_MENU_LIST,
  });
}
// 删除
export function menuDel(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_MENU_DEL,
    params,
  });
}
// 编辑
export function menuEdit(params) {
  return defHttp.post({
    url: permissionManageConst.PERMISSION_MANAGE_MENU_Edit,
    params,
  });
}
//添加
export function menuAdd(params) {
  return defHttp.post({
    url: permissionManageConst.PERMISSION_MANAGE_MENU_ADD,
    params,
  });
}
// 角色权限
export function getRoleP(params) {
  return defHttp.get({
    url: permissionManageConst.PERMISSION_MANAGE_MENU_DEL,
    params,
  });
}

import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { txOssConst } from './const';

// 获取aliOss token
export function getTxToken(params?: {}) {
  return defHttp.get({
    headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    url: txOssConst.TX_COS_TOKEN,
    params,
  });
}

// 上传图片后保存图片信息
export function saveImgInfo(params) {
  return defHttp.post(
    {
      url: txOssConst.UPLOAD_IMG_SAVE_INFO,
      params,
    },
    {
      errorMessageMode: 'none',
    },
  );
}

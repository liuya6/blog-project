import OSS from 'ali-oss';
import { uploadService } from '/@/api';
import { fileType } from '/@/utils/fileType';
import { getImageInfo } from '/@/utils/tools';

interface AliToken {
  accessKeyId: string;
  accessKeySecret: string;
  bucketName: string;
  endpoint: string;
  expiration: string;
  expire: number;
  region: string;
  securityToken: string;
}

class AliOss {
  private static instance: AliOss | undefined;
  tokenConfig: Partial<AliToken> | undefined;
  private client;
  private abortCheckpoint; // 中断点
  private fileName; // 文件名

  static getInstance() {
    if (!this.instance) {
      this.instance = new AliOss();
    }
    return this.instance;
  }

  private async updateConfig() {
    try {
      if (!this.tokenConfig || !('accessKeyId' in this.tokenConfig)) {
        const { data } = await uploadService.getTxToken();
        this.tokenConfig = data;
      }

      if (!this.tokenConfig || !('accessKeyId' in this.tokenConfig)) {
        console.warn('未获取到alioss-token');
        return;
      }

      this.client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
        region: this.tokenConfig.region,
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: this.tokenConfig.accessKeyId,
        accessKeySecret: this.tokenConfig.accessKeySecret,
        // 从STS服务获取的安全令牌（SecurityToken）。
        stsToken: this.tokenConfig.securityToken,
        // 填写Bucket名称。
        bucket: this.tokenConfig.bucketName,
      });
    } catch (e) {
      console.warn(e, 'updateConfig-error');
    }
  }

  // private async uploadFile(file: File, path: string) {
  //   await this.updateConfig();
  //   const fileName = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
  //   const fileNameArr = file.name.split('.');
  //   const fileTypeName = fileNameArr[fileNameArr.length - 1];
  //   const ossFileName = `upload/dangwan/${path ? path + '/' : ''}${fileName}.${fileTypeName}`;
  //   console.info(file, fileName, ossFileName);
  //   try {
  //     const result = await this.client.put(
  //       ossFileName,
  //       file,
  //       //{headers}
  //     );
  //     return result.url;
  //   } catch (e) {
  //     console.warn(e, 'uploadFileImp-error');
  //   }
  // }

  private static getFileName(file: File, path: string) {
    const fileName = `${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
    const fileNameArr = file.name.split('.');
    const fileTypeName = fileNameArr[fileNameArr.length - 1];
    const ossFileName = `upload/dangwan/${path ? path + '/' : ''}${fileName}.${fileTypeName}`;
    return {
      fileName,
      ossFileName,
      fileTypeName,
    };
  }

  // 上传
  private async uploadFile(
    file: File,
    progress: (value: number) => void,
    path: string,
    options?: any,
  ) {
    if (!this.client) {
      await this.updateConfig();
    }
    const { fileName, ossFileName } = AliOss.getFileName(file, path);
    this.fileName = fileName;
    try {
      const result = await this.client.multipartUpload(
        ossFileName,
        file,
        {
          ...options,
          progress: (p, cpt) => {
            this.abortCheckpoint = cpt;
            progress(p * 100);
          },
          // 设置并发上传的分片数量。
          parallel: 4,
          // 设置分片大小。默认值为1 MB，最小值为100 KB。
          partSize: 1024 * 1024,
          // 自定义元数据，通过HeadObject接口可以获取Object的元数据。
          // meta: { year: 2020, people: 'test' },
          // mime: 'text/plain',
          // callback: {
          //   // 设置回调请求的服务器地址。
          //   url: "http://examplebucket.aliyuncs.com:23450",
          //   // 设置回调请求消息头中Host的值，即您的服务器配置Host的值。
          //   host: "yourHost",
          //   /* eslint no-template-curly-in-string: [0] */
          //   // 设置发起回调时请求body的值。
          //   body: "bucket=${bucket}&object=${object}&var1=${x:var1}",
          //   // 设置发起回调请求的Content-Type。
          //   contentType: "application/x-www-form-urlencoded",
          //   customValue: {
          //     // 设置发起回调请求的自定义参数。
          //     var1: "value1",
          //     var2: "value2",
          //   },
          // },
        },
        //{headers}
      );
      let url = result.res.requestUrls[0];
      if (result.res.requestUrls[0].indexOf('?uploadId') >= 0) {
        url = result.res.requestUrls[0].split('?uploadId')[0];
      }
      const isImg = await fileType.isImage(file);

      if (isImg && url && file) {
        savaImgInfo(file, url);
      }

      return url;
    } catch (e) {
      console.warn(e, 'uploadFileImp-error');
    }
  }

  // 中断上传
  abortUpload() {
    this.client.abortMultipartUpload(this.abortCheckpoint.name, this.abortCheckpoint.uploadId);
  }

  // 列举已上传的分片
  async getListParts() {
    return await this.client.listParts(this.fileName, this.abortCheckpoint.uploadId);
  }

  // 列举分片上传事件 （获取所有已初始化但尚未完成或已取消的分片上传事件）
  async getListPartsEvent() {
    return await this.client.listUploads({ 'max-uploads': 100 });
  }

  // 断点续传
  async resumeUpload(file: File, progress: (value: number) => void, path?: any) {
    return await this.uploadFile(file, progress, path, { checkpoint: this.abortCheckpoint });
  }

  async postFile(file: File, progress: (value: number) => void, path?: any) {
    return await this.uploadFile(file, progress, path);
  }
}

// headers = {
//   // 指定该Object被下载时的网页缓存行为。
//   'Cache-Control': 'no-cache',
//   // 指定该Object被下载时的名称。
//   'Content-Disposition': 'example.txt',
//   // 指定该Object被下载时的内容编码格式。
//   'Content-Encoding': 'utf-8',
//   // 指定过期时间，单位为毫秒。
//   Expires: '1000',
//   // 指定Object的存储类型。
//   'x-oss-storage-class': 'Standard',
//   // 指定Object标签，可同时设置多个标签。
//   'x-oss-tagging': 'Tag1=1&Tag2=2',
//   // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
//   'x-oss-forbid-overwrite': 'true',
// };

async function savaImgInfo(file: File, url: string) {
  const imgInfo = await getImageInfo(file);
  if (imgInfo && 'width' in imgInfo) {
    const params = {
      images: JSON.stringify([
        {
          url,
          width: imgInfo.width,
          height: imgInfo.height,
          size: file.size,
          from: imgInfo.width >= imgInfo.height ? 1 : 2,
        },
      ]),
    };
    uploadService.saveImgInfo(params);
  }
}

export const alioss = AliOss.getInstance();

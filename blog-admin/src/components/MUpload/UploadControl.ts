import { ref } from 'vue';
import { alioss } from '/@/utils/alioss';
import * as ApkParser from 'app-info-parser/src/apk';
// import * as mammoth from 'mammoth/mammoth.browser';

export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  percent?: number;
  url?: string;
  preview?: string;
  originFileObj?: any;
}

export interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

//获取字符串url的集合 toString()就变成了带逗号的字符串
export function formatFileList(fileList: FileItem[]) {
  if (!fileList.length) return '';
  const list: string[] = [];
  fileList.forEach((item: any) => {
    list.push(item.url);
  });
  return list.toString();
}

//文件自定义上传方法抽取
export async function fileUpload(
  value: any,
  emit: any,
  fileBeanList: FileItem[],
  fileList: any,
  accept: string,
  filePath: string,
  process: (val: number) => void,
) {
  //请求后台接口返回url串
  const url = await alioss.postFile(value.file, process, filePath);
  let apkInfo;
  if (accept == '.apk') {
    //apk文件分析apk文件
    apkInfo = await getApkInfo(value.file);
  }
  value.onSuccess(url);
  fileList.value = [value.file];
  fileBeanList = [];
  fileBeanList.push({ url: url, uid: value.uid });
  emit('change', formatFileList(fileBeanList), apkInfo, value.file);
}

//文件移除方法抽取
export function fileRemove(file: any, emit: any, fileBeanList: FileItem[]) {
  let choseIndex = 0;
  fileBeanList.forEach((item: any, index: any) => {
    if (item.uid == file.uid) {
      choseIndex = index;
    }
  });
  fileBeanList.splice(choseIndex, 1);
  emit('change', formatFileList(fileBeanList), null, null);
}

//获取apk信息
export async function getApkInfo(file: any) {
  try {
    const parser = new ApkParser(file); //files:所上传的文件内容
    return await parser.parse();
  } catch (e) {
    console.warn(e);
    return null;
  }
}

export function formatFileBeanList(props) {
  const fileList = ref<FileItem[]>([]);
  if (!props) return { fileList };
  if (props.value.indexOf(',') > -1) {
    const list = props.value.split(',');
    list.forEach((item: any, index: any) => {
      fileList.value.push({
        uid: index + 'index',
        name: getFileName(props.defaultValue),
        status: 'done',
        url: item,
      });
    });
  } else if (props.value != null && props.value !== '') {
    fileList.value.push({
      uid: 0 + 'index',
      name: getFileName(props.value),
      status: 'done',
      url: props.value,
    });
  }
  return { fileList };
}

export function getFileName(url: string) {
  if (!url || url.indexOf('/') == -1) {
    return '';
  }
  const valueList = url.split('/');
  return valueList[valueList.length - 1];
}

// export async function docxToHtml(value: any, loadEvent) {
//   //doc文件 转成 html
//   const arrayBuffer = loadEvent.target.result;
//   const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
//   const fileName = value.file.name.split('.docx')[0];
//   return new File([result.value], fileName + '.html', {
//     type: 'text/html;charset=utf-8',
//   });
// }

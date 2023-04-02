import { RouterItem } from '/@/router/types';
import { cloneDeep } from 'lodash-es';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { useMessage } from '/@/hooks/web/useMessage';

/**
 * 生成[n,m]的随机整数
 * @param minNum 最小值
 * @param maxNum 最大值
 */

function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1);
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    default:
      return 0;
  }
}

/**
 * select框搜索配置
 */
function getSelectSearchConfig() {
  return {
    showSearch: true,
    filterOption: (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
  };
}

/**
 * b to mb
 * @Param val 大小size
 */
function bToMb(val: number): string {
  if (!val) return '';
  let size = '';
  if (val < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = val.toFixed(2) + 'B';
  } else if (val < 0.1 * 1024 * 1024) {
    //小于0.1MB，则转化成KB
    size = (val / 1024).toFixed(2) + 'KB';
  } else if (val < 1024 * 1024 * 1024) {
    //小于0.1GB，则转化成MB
    size = (val / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    size = (val / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
  const sizeStr = size + ''; //转成字符串
  const index = sizeStr.indexOf('.'); //获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
  if (dou == '00') {
    //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
}

/**
 * 获取图片 宽 高
 * @param file 图片file
 */
interface ImgInfo {
  width: number;
  height: number;
}

function getImageInfo(file: File): Promise<ImgInfo | null> {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); // 根据图片路径读取图片
      fileReader.onload = function () {
        const img = new Image();
        typeof this.result === 'string' ? (img.src = this.result) : (img.src = '');
        img.onload = function () {
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
      };
    } catch (err) {
      reject(null);
    }
  });
}

function parseTreeData(
  routes: RouterItem[],
  t: Fn,
  arr: Partial<RouterItem[]> = [],
): Partial<RouterItem[]> {
  routes.forEach((item: any) => {
    const itemRouter: Partial<RouterItem> = {};
    for (const v in item) {
      if (v === 'children' && item[v]?.length) {
        itemRouter.children = parseTreeData(item[v], t);
      } else if (v === 'menu_name') {
        itemRouter.title = t(item[v]);
      } else if (v === 'id') {
        itemRouter.key = item[v];
      } else {
        itemRouter[v] = item[v];
      }
    }
    arr.push(<RouterItem>itemRouter);
  });
  return arr;
}

function difference(arr, obj, key) {
  const list = cloneDeep(arr);
  const HasObj = list.some((item) => item[key] === obj[key]);
  if (!HasObj) {
    list.push(obj);
  } else {
    let index = null;
    arr.forEach((v, i) => {
      if (v[key] === obj[key]) {
        index = i;
      }
    });
    list.splice(index, 1, obj);
  }
  return list;
}

// 路由拍平
function flatRoutes(routes: any, arr: any) {
  routes.forEach((item: any) => {
    if (item.children && item.children.length) {
      flatRoutes(item.children, arr);
    }
    arr.push(item);
  });
  return arr;
}

// 检查权限
function checkAuthority(routerName: string, fn: Function) {
  const permissionStore = usePermissionStoreWithOut();
  const { createMessage } = useMessage();
  if (!permissionStore.getAllRouterNameList.includes(routerName)) {
    return createMessage.error('暂无权限');
  } else {
    fn();
  }
}

export {
  randomNum,
  getSelectSearchConfig,
  bToMb,
  getImageInfo,
  parseTreeData,
  difference,
  flatRoutes,
  checkAuthority,
};

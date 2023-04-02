function useTableSum(
  calcData: any = {},
  changeDataParamsName: any = [],
  notShowSumParamsArr: any = [],
) {
  const sums: any = [];
  const cacheData = {};

  function getTableSum(param: { columns: Array<any>; data: Array<any> }) {
    const { columns, data } = param;
    if (!data.length) return [];
    const allKey: string[] = Object.keys(data[0]);
    let values: number[] = [];
    allKey.forEach((key: string) => {
      // 先过滤一些不用做计算的参数，例如 id  用户姓名name 年龄age 等
      if (notShowSumParamsArr.includes(key)) return;
      // 转成number类型
      values = data.map((item: any) => Number(item[key]));
      // 如果转为num类型 为NaN，说明是汉字啥的 就直接return 不做计算
      if (values.some((item: number) => isNaN(item))) return;
      // 给的分 需要 转换为元
      if (changeDataParamsName.includes(key)) {
        values = values.map((item: number) => Number((item / 100).toFixed(2)));
      }
      // -1 改为 0
      // values = values.map((item: number) => (item < 0 ? 0 : item))
      cacheData[key] = values.reduce((a: number, b: number) => a + b) || 0;
    });
    const needParseParams: string[] = Object.keys(calcData);
    columns.forEach((column: any, index: number) => {
      if (index === 0) return (sums[index] = '合计');
      if (needParseParams.includes(column.property)) {
        const item = calcData[column.property];
        let getCaleNum = item.fn(cacheData);
        getCaleNum = item.hasPercentSign ? getCaleNum * 100 : getCaleNum;
        cacheData[column.property] = `${getCaleNum.toFixed(item.toFixedNum || 2)}${
          item.hasPercentSign ? '%' : ''
        }`;
      }
      sums[index] = cacheData[column.property];
    });
    return [sums];
  }

  return { getTableSum };
}

export { useTableSum };

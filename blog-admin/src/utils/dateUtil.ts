/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date: dayjs.Dayjs | undefined | number | string | Date = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return date ? dayjs(date).format(format) : '';
}

export function formatToDate(
  date: dayjs.Dayjs | undefined | string = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;

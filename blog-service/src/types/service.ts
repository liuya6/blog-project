export interface HttpResponse<T> {
  code: number;
  data: T;
  msg: string;
  status: boolean;
}

export interface MOptionsConfig {
  title: string;
  type: 'button' | 'dropdown';
  btnConfig?: {
    [key: string]: any;
  };
  dropdownConfig?: {
    [key: string]: any;
  };
  emitType?: string;
  list?: [
    {
      title: string;
      emitType: string;
    },
  ];
}

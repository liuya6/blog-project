export interface MPConfirmConfig {
  title: string;
  emitType?: string;
  hidden?: boolean;
  confirmConfig?: {
    title: string;
    [key: string]: any;
  };
  btnConfig?: {
    type?: string;
    danger?: boolean;
    [key: string]: any;
  };
  onClick?: (emitType: string) => void;
  onConfirm?: (emitType: string) => void;
}

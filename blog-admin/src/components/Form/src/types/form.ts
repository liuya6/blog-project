import type { NamePath, RuleObject } from 'ant-design-vue/lib/form/interface';
import type { VNode } from 'vue';
import type { ButtonProps as AntdButtonProps } from '/@/components/Button';
import type { FormItem } from './formItem';
import type { ColEx, ComponentType } from './index';
import type { TableActionType } from '/@/components/Table/src/types/table';
import type { CSSProperties } from 'vue';
import type { RowProps } from 'ant-design-vue/lib/grid/Row';

export type FieldMapToTime = [string, [string, string], string?][];

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}

export interface ButtonProps extends AntdButtonProps {
  text?: string;
  textAlign?: 'left' | 'right';
}

export interface FormActionType {
  submit: () => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Recordable;
  clearValidate: (name?: string | string[]) => Promise<void>;
  updateSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  resetSchema: (data: Partial<FormSchema> | Partial<FormSchema>[]) => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  removeSchemaByFiled: (field: string | string[]) => Promise<void>;
  appendSchemaByField: (
    schema: FormSchema,
    prefixField: string | undefined,
    first?: boolean | undefined,
  ) => Promise<void>;
  validateFields: (nameList?: NamePath[]) => Promise<any>;
  validate: (nameList?: NamePath[]) => Promise<any>;
  scrollToField: (name: NamePath, options?: ScrollOptions) => Promise<void>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];

export interface FormProps {
  name?: string;
  layout?: 'vertical' | 'inline' | 'horizontal';
  // Form value
  model?: Recordable;
  // The width of all items in the entire form
  labelWidth?: number;
  // alignment
  labelAlign?: 'left' | 'right';
  // Row configuration for the entire form
  rowProps?: RowProps;
  // Submit form on reset
  submitOnReset?: boolean;
  // Submit form on form changing
  submitOnChange?: boolean;
  // Col configuration for the entire form
  labelCol?: Partial<ColEx>;
  // Col configuration for the entire form
  wrapperCol?: Partial<ColEx>;

  // General row style
  baseRowStyle?: CSSProperties;

  // General col configuration
  baseColProps?: Partial<ColEx>;

  // Form configuration rules
  schemas?: FormSchema[];
  // Function values used to merge into dynamic control form items
  mergeDynamicData?: Recordable;
  // Compact mode for search forms
  compact?: boolean;
  // Blank line span
  emptySpan?: number | Partial<ColEx>;
  // Internal component size of the form
  size?: 'default' | 'small' | 'large';
  // Whether to disable
  disabled?: boolean;
  // Time interval fields are mapped into multiple
  fieldMapToTime?: FieldMapToTime;
  // Placeholder is set automatically
  autoSetPlaceHolder?: boolean;
  // Auto submit on press enter on input
  autoSubmitOnEnter?: boolean;
  // Check whether the information is added to the label
  rulesMessageJoinLabel?: boolean;
  // Whether to show collapse and expand buttons
  showAdvancedButton?: boolean;
  // Whether to focus on the first input box, only works when the first form item is input
  autoFocusFirstItem?: boolean;
  // Automatically collapse over the specified number of rows
  autoAdvancedLine?: number;
  // Always show lines
  alwaysShowLines?: number;
  // Whether to show the operation button
  showActionButtonGroup?: boolean;

  // Reset button configuration
  resetButtonOptions?: Partial<ButtonProps>;

  // Confirm button configuration
  submitButtonOptions?: Partial<ButtonProps>;

  // Operation column configuration
  actionColOptions?: Partial<ColEx>;

  // Show reset button
  showResetButton?: boolean;
  // Show confirmation button
  showSubmitButton?: boolean;

  resetFunc?: () => void;
  submitFunc?: () => void;
  transformDateFunc?: (date: any) => string;
  colon?: boolean;
}
export interface FormSchema {
  // 字段名称
  field: string;
  // 内部值变化触发的事件名称，默认变化
  changeEvent?: string;
  // 绑定到 v-model 默认值的变量名
  valueField?: string;
  // 标签名称
  label: string | VNode;
  // 辅助文字
  subLabel?: string;
  // 文本右侧的帮助文本
  helpMessage?:
    | string
    | string[]
    | ((renderCallbackParams: RenderCallbackParams) => string | string[]);
  // BaseHelp 组件道具
  helpComponentProps?: Partial<HelpComponentProps>;
  // 标签宽度，如果通过，itemProps配置的labelCol和WrapperCol无效
  labelWidth?: number;
  // 用formModel的全局设置禁用labelWidth的调整，自己手动设置labelCol和wrapperCol
  disabledLabelWidth?: boolean;
  // 渲染组件
  component: ComponentType;
  // 组件参数
  componentProps?:
    | ((opt: {
        schema: FormSchema;
        tableAction: TableActionType;
        formActionType: FormActionType;
        formModel: Recordable;
      }) => Recordable)
    | object;
  // 是否必需
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  suffix?: string | number | ((values: RenderCallbackParams) => string | number);

  // 验证规则
  rules?: Rule[];
  // 检查信息是否添加到标签中
  rulesMessageJoinLabel?: boolean;

  // 参考表格ModelItem
  itemProps?: Partial<FormItem>;

  // formModelItem 外的 col 配置
  colProps?: Partial<ColEx>;

  // 默认值
  defaultValue?: any;
  isAdvanced?: boolean;

  // 匹配细节组件
  span?: number;
  // 是否显示（v-if）
  ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  // 是否显示（v-show）
  show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  // 渲染表单项标签中的内容
  render?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;

  // 渲染 col 内容需要外包装表单项
  renderColContent?: (renderCallbackParams: RenderCallbackParams) => VNode | VNode[] | string;
  renderComponentContent?:
    | ((renderCallbackParams: RenderCallbackParams) => any)
    | VNode
    | VNode[]
    | string;

  // 自定义插槽，在 from-item 中
  slot?: string;

  // 自定义插槽，类似于 renderColContent
  colSlot?: string;

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[];
  // 右边内容宽度
  rightContentWidth?: number;
}

export interface HelpComponentProps {
  maxWidth: string;
  // Whether to display the serial number
  showIndex: boolean;
  // Text list
  text: any;
  // colour
  color: string;
  // font size
  fontSize: string;
  icon: string;
  absolute: boolean;
  // Positioning
  position: any;
}

import type { ProjectConfig } from '/#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { CacheTypeEnum } from '/@/enums/cacheEnum';
import {
  ContentEnum,
  PermissionModeEnum,
  ThemeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  SessionTimeoutProcessingEnum,
} from '/@/enums/appEnum';
import { SIDE_BAR_BG_COLOR_LIST, HEADER_PRESET_BG_COLOR_LIST } from './designSetting';
import { primaryColor } from '../../build/config/themeConfig';

// 更改后需要清除浏览器缓存
const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: false,
  // 是否显示主题切换按钮
  showDarkModeToggle: false,
  // `设置`按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 权限相关的缓存存储在 sessionStorage 或 localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // 主题色
  themeColor: primaryColor,
  // 网站灰色模式，打开可能的哀悼日期
  grayMode: false,
  // 色弱模式
  colorWeak: false,
  // 是否取消菜单、置顶、多标签页显示，以备其他系统可能嵌入
  fullContent: false,
  // 内容模式
  contentMode: ContentEnum.FULL,
  // 是否显示logo
  showLogo: true,
  // 是否显示页尾
  showFooter: false,
  // 头部配置
  headerSetting: {
    // 背景
    bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
    // 是否固定
    fixed: true,
    // 是否显示
    show: true,
    // 主题色
    theme: ThemeEnum.LIGHT,
    // 锁屏
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示文档按钮
    showDoc: false,
    // 是否显示通知按钮
    showNotice: false,
    // 是否显示通知按钮搜索
    showSearch: true,
  },
  // slider左边菜单配置
  menuSetting: {
    // 背景
    bgColor: SIDE_BAR_BG_COLOR_LIST[0],
    // 是否固定
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否可以拖动
    // 只限于打开左侧菜单，鼠标在菜单右侧有一个拖动条
    canDrag: false,
    // 是否显示
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 拆分菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 折叠触发位置
    trigger: TriggerEnum.HEADER,
    // 打开手风琴模式，只显示一个菜单
    accordion: false,
    // 切换页面以关闭菜单
    closeMixSidebarOnChange: false,
    // 模块打开方式‘点击’|‘悬停’
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false,
  },
  // 标签设置
  multiTabsSetting: {
    // 是否缓存
    cache: false,
    // 是否显示
    show: true,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 打开快速操作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },
  // 页面跳转配置
  transitionSetting: {
    // 是否开启页面切换动画，禁用状态也会禁用 pageLoading
    enable: true,
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // 是否开启页面切换加载
    // 仅在 enable=true 时打开
    openPageLoading: true,
    // 是否打开顶部进度条
    openNProgress: false,
  },
  // 是否开启KeepAlive缓存最好在开发时关闭，否则每次都需要清空缓存
  openKeepAlive: true,
  // 自动锁屏时间，0不锁屏。单位分钟 默认 0
  lockTime: 0,
  // 是否显示面包屑
  showBreadCrumb: true,
  // 是否显示面包屑图标
  showBreadCrumbIcon: false,
  // 使用错误处理程序插件
  useErrorHandle: false,
  // 是否显示回到顶部按钮
  useOpenBackTop: true,
  // 是否可以嵌入 iframe 页面
  canEmbedIFramePage: true,
  // 切换界面时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,
  // 切换接口时是否取消已经发送但没有响应的http请求。如果启用，想覆盖单个界面，可以在单独的界面中设置
  removeAllHttpPending: false,
};

export default setting;

import { App, Directive } from 'vue';

import { useMessage } from '/@/hooks/web/useMessage';

const { createMessage } = useMessage();

interface CopyEl extends HTMLElement {
  $value: string;
  handler: (e: Event) => void;
}

const copy: Directive = {
  mounted(el: CopyEl, { value }) {
    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    el.handler = (e: Event) => {
      e.stopPropagation();
      if (!el.$value) return;
      const textarea = document.createElement('textarea');
      textarea.readOnly = true;
      textarea.style.position = 'absolute';
      textarea.style.transform = 'translate(-10000px)';
      textarea.value = el.$value;
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand('Copy');
      if (result) {
        createMessage.success('复制成功');
      }
      document.body.removeChild(textarea);
    };
    el.addEventListener('click', el.handler);
  },
  updated(el: CopyEl, { value }) {
    el.$value = value;
  },
  unmounted(el: CopyEl) {
    el.removeEventListener('click', el.handler);
  },
};

export function serCopyDirectives(app: App) {
  app.directive('copy', copy);
}

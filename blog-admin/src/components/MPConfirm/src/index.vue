<script lang="tsx">
  import { defineComponent, PropType } from 'vue';
  import { Popconfirm } from 'ant-design-vue';
  import { MPConfirmConfig } from '../types';
  import { DragOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    props: {
      options: {
        type: Array as PropType<MPConfirmConfig[]>,
        default: () => [],
      },
      showDragBtn: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      return () => (
        <div
          onClick={(e: Event) => {
            e.stopPropagation();
          }}
        >
          {props.options.map((item) => {
            if (item.hidden) return null;

            if ('confirmConfig' in item) {
              return (
                <Popconfirm
                  {...item.confirmConfig}
                  onConfirm={() => {
                    if (item.onConfirm) {
                      item.onConfirm(item.emitType || '');
                    }
                  }}
                >
                  {renderBtn(item)}
                </Popconfirm>
              );
            }

            return renderBtn(item);
          })}
          {props.showDragBtn ? <DragOutlined class="dragBtn" /> : null}
        </div>
      );

      function renderBtn(item: any) {
        const btnConfig = Object.assign(
          {
            type: 'link',
            size: 'small',
          },
          item.btnConfig || {},
        );
        return (
          <a-button
            {...btnConfig}
            onClick={() => {
              if (item.onClick) {
                item.onClick(item.emitType || '');
              }
            }}
          >
            {item.title}
          </a-button>
        );
      }
    },
  });
</script>
<style scoped lang="less"></style>

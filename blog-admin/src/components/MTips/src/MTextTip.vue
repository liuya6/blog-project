<script lang="tsx">
  import { defineComponent, nextTick, ref, onMounted, unref, onBeforeUnmount } from 'vue';
  import { Tooltip } from 'ant-design-vue';

  import { isShowText } from '/@/utils/is';

  export default defineComponent({
    components: {
      Tooltip,
    },
    props: {
      text: [Number, String],
      isLink: {
        type: Boolean,
        default: () => false,
      },
    },
    emits: ['click'],
    setup(props, { emit }) {
      const box = ref(null);
      const textBox = ref(null);
      const hasTips = ref(true);

      onMounted(() => {
        checkTextWidth();
        window.addEventListener('resize', checkTextWidth);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('resize', checkTextWidth);
      });

      return () => (
        <div
          ref={box}
          onClick={() => {
            emit('click');
          }}
        >
          {unref(hasTips) ? (
            <Tooltip>
              {{
                title: () => {
                  return props.text;
                },
                default: () => {
                  return (
                    <div
                      ref={textBox}
                      class={{
                        text: true,
                        isLink: props.isLink,
                      }}
                    >
                      {isShowText(props.text) ? props.text : ''}
                    </div>
                  );
                },
              }}
            </Tooltip>
          ) : (
            <span
              class={{
                isLink: props.isLink,
              }}
            >
              {isShowText(props.text) ? props.text : ''}
            </span>
          )}
        </div>
      );

      function checkTextWidth() {
        nextTick(() => {
          const boxEl = box.value as unknown as HTMLElement;
          const textBoxEl = textBox.value as unknown as HTMLElement;
          if (!boxEl || !textBoxEl) return;
          const boxWidth = boxEl.clientWidth;
          const textWidth = textBoxEl.scrollWidth;
          hasTips.value = textWidth > boxWidth;
        });
      }
    },
  });
</script>

<style scoped lang="less">
  @hover-color: rgba(0, 0, 0, 0.85);

  .text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      color: @hover-color;
    }
  }

  .isLink {
    color: #0960bd;
    cursor: pointer;

    &:hover {
      color: @hover-color;
    }
  }
</style>

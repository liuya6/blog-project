<script lang="tsx">
  import { defineComponent, nextTick, ref, onMounted, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';

  import { isShowText } from '/@/utils/is';

  export default defineComponent({
    components: {
      Tooltip,
    },
    props: {
      placeholderWidth: {
        type: Number,
        default: 0,
      },
      text: [Number, String],
    },
    setup(props) {
      const box = ref(null);
      const textBox = ref(null);
      const hasTips = ref(true);

      onMounted(() => {
        checkTextWidth();
      });

      return () => (
        <div ref={box} class="tableDataTips">
          {unref(hasTips) ? (
            <Tooltip>
              {{
                title: () => {
                  return props.text;
                },
                default: () => {
                  return (
                    <div ref={textBox} class="text" v-copy={props.text}>
                      {isShowText(props.text) ? props.text : ''}
                    </div>
                  );
                },
              }}
            </Tooltip>
          ) : (
            <> {isShowText(props.text) ? props.text : ''}</>
          )}
        </div>
      );

      // function resize() {
      //   window.addEventListener('resize', this.checkTextWidth);
      //   this.$once('hook:beforeDestroy', () => {
      //     window.removeEventListener('resize', this.checkTextWidth);
      //   });
      // }

      function checkTextWidth() {
        nextTick(() => {
          const boxEl = box.value as unknown as HTMLElement;
          const textBoxEl = textBox.value as unknown as HTMLElement;
          if (!boxEl || !textBoxEl) return;
          const boxWidth = boxEl.clientWidth - props.placeholderWidth;
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
</style>

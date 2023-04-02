<script lang="tsx">
  import { computed, defineComponent, nextTick, onMounted, ref, unref } from 'vue';
  import { Tooltip, Tag } from 'ant-design-vue';
  import { randomNum } from '/@/utils/tools';

  export default defineComponent({
    props: {
      tagList: {
        type: [Array, String],
        default: () => [],
      },
    },
    setup(props) {
      const resultList = computed<any[]>(() => {
        if (Array.isArray(props.tagList)) {
          return props.tagList;
        }
        if (!props.tagList || props.tagList === '') {
          return [];
        }
        return props.tagList.split(',');
      });
      const box = ref(null);
      const textBox = ref(null);
      const hasTips = ref(true);
      const colorList = ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'];
      const colorStrList = computed(() => {
        let list: string[] = [];
        colorList.map(() => {
          list.push(colorList[randomNum(0, 6)]);
        });
        return list;
      });

      onMounted(() => {
        checkTextWidth();
      });

      return () => (
        <div ref={box}>
          {unref(hasTips) ? (
            <Tooltip color="#fff">
              {{
                title: () => {
                  return renderTag(resultList.value);
                },
                default: () => {
                  return (
                    <div ref={textBox} class="tagBox">
                      {renderTag(resultList.value)}
                    </div>
                  );
                },
              }}
            </Tooltip>
          ) : (
            <> {renderTag(resultList.value)}</>
          )}
        </div>
      );

      function renderTag(tagList: any[]) {
        return tagList.map((item: string, index: number) => {
          return (
            <Tag style="margin-right:2px" color={unref(colorStrList)[index]}>
              {item}
            </Tag>
          );
        });
      }

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
  .tagBox {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

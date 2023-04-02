<script lang="tsx">
  import { defineComponent } from 'vue';
  import { isFunction } from '/@/utils/is';

  export default defineComponent({
    props: {
      title: String,
      tips: {
        type: [String, Function, Array],
        default: null,
      },
      showIndex: {
        type: Boolean,
        default: () => false,
      },
    },
    setup(props) {
      function resultTip() {
        if (isFunction(props.tips)) {
          const tips = props.tips();

          return parseTips(tips);
        }
        return parseTips(props.tips as string | []);
      }
      function parseTips(tips: string | []) {
        let result: any = '';
        if (typeof tips === 'string') {
          result = tips;
        }
        if (Array.isArray(tips)) {
          result = tips.map((text: string, index: number) => {
            return (
              <p key={text}>
                <>
                  {props.showIndex ? `${index + 1}. ` : ''}
                  {text}
                </>
              </p>
            );
          });
        }
        return result;
      }

      function getTitleSlots() {
        return resultTip();
      }

      return () => (
        <div>
          {props.tips ? (
            <a-tooltip>
              {{
                default: () => {
                  return <div>{props.title}</div>;
                },
                title: () => {
                  return getTitleSlots();
                },
              }}
            </a-tooltip>
          ) : (
            <>{props.title}</>
          )}
        </div>
      );
    },
  });
</script>

<style scoped lang="less"></style>

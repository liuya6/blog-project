<script lang="tsx">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    props: {
      message: {
        type: Array as PropType<Array<string>>,
        default: () => ['请传入message属性'],
      },
    },

    setup(props) {
      return () => {
        return (
          <div class="mHelpMsg">
            {props.message?.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
        );
      };
    },
  });
</script>

<style scoped lang="less">
  .mHelpMsg {
    margin: 5px;
    padding: 15px 10px 1px;
    background-color: #fff;

    p {
      color: #666;
    }
  }
</style>

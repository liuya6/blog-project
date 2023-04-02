<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Popover } from 'ant-design-vue';

  import { tradeService } from '/@/api';

  export default defineComponent({
    props: {
      ip: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const loading = ref(false);
      const area = ref('');

      return () => (
        <Popover title="地区" trigger="click">
          {{
            default: () => (
              <a-button type="link" onClick={getArea}>
                {props.ip}
              </a-button>
            ),
            content: () => {
              return <div v-loading={loading.value}>{area.value}</div>;
            },
          }}
        </Popover>
      );

      async function getArea() {
        loading.value = true;
        const { data } = await tradeService.ipToArea(props.ip);
        area.value = data || '-';
        loading.value = false;
      }
    },
  });
</script>

<style scoped></style>

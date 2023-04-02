<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Popover, Table } from 'ant-design-vue';

  export default defineComponent({
    props: {
      title: {
        type: String,
        default: '详情',
      },
      dataSource: {
        type: Array,
        default: () => [],
      },
      columns: {
        type: Array,
        default: () => [
          {
            title: '未知',
            dataIndex: 'a',
          },
        ],
      },
    },
    setup(props) {
      return () => (
        <Popover title={props.title}>
          {{
            default: () => <a-button type="link">查看</a-button>,
            content: () => {
              return (
                <Table
                  dataSource={props.dataSource}
                  columns={props.columns as any}
                  pagination={false}
                />
              );
            },
          }}
        </Popover>
      );
    },
  });
</script>

<style scoped lang="less"></style>

<script lang="tsx">
  import { defineComponent, PropType } from 'vue';
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';

  import { MOptionsConfig } from '../type';

  export default defineComponent({
    props: {
      options: {
        type: Array as PropType<MOptionsConfig[]>,
        default: () => [],
      },
    },
    emits: ['click'],
    setup(props, { emit }) {
      return () => (
        <div class="mOptions">
          {props.options.map((item) => {
            return renderItem(item);
          })}
        </div>
      );

      function renderItem(item) {
        switch (item.type) {
          case 'button':
            return (
              <a-button
                {...item.btnConfig}
                onClick={() => {
                  emit('click', item.emitType);
                }}
              >
                {item.title}
              </a-button>
            );
          case 'dropdown':
            return (
              <Dropdown
                v-slots={{
                  overlay: () => {
                    return (
                      <Menu
                        {...item.dropdownConfig}
                        onClick={(data: any) => {
                          emit('click', data.key);
                        }}
                      >
                        {item.list.map((v) => {
                          return <MenuItem key={v.emitType}>{v.title}</MenuItem>;
                        })}
                      </Menu>
                    );
                  },
                }}
              >
                <a-button {...item.btnConfig}>
                  {item.title}
                  <DownOutlined />
                </a-button>
              </Dropdown>
            );
          default:
            return null;
        }
      }
    },
  });
</script>

<style scoped lang="less">
  .mOptions {
    margin-bottom: 10px;
    .ant-btn {
      margin-right: 10px;
    }
  }
</style>

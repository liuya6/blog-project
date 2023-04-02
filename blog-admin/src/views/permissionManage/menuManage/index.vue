<script lang="tsx">
  import { defineComponent, nextTick } from 'vue';
  import { PlusCircleOutlined } from '@ant-design/icons-vue';
  import { BasicTable, useTable } from '/@/components/Table';

  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { permissionService } from '/@/api';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns } from './config';
  import { ResultEnum } from '/@/enums/httpEnum';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, PageWrapper },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll, deleteItem }] = useTable({
        id: 'menuList',
        title: '菜单列表',
        api: getMenuList,
        columns: columns(t, handleEdit, handleDelete),
        isTreeTable: true,
        pagination: false,
        striped: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
      });

      async function getMenuList() {
        const { data } = await permissionService.getMenuList();
        return data;
      }

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        deleteItem(async () => {
          const { code } = await permissionService.menuDel({
            id: record.id,
          });
          return {
            success: code === ResultEnum.SUCCESS,
            reload,
          };
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // 演示默认展开所有表项
        nextTick(expandAll);
      }

      return () => (
        <PageWrapper>
          <BasicTable onRegister={registerTable} onFetchSuccess={onFetchSuccess}>
            {{
              toolbar: () => (
                <a-button type="primary" onClick={handleCreate}>
                  <PlusCircleOutlined />
                  {t('common.addText')}
                </a-button>
              ),
            }}
          </BasicTable>
          <MenuDrawer onRegister={registerDrawer} onSuccess={handleSuccess} />
        </PageWrapper>
      );
    },
  });
</script>

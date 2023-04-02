<script lang="tsx">
  import { defineComponent } from 'vue';
  import { PlusCircleOutlined } from '@ant-design/icons-vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useGo } from '/@/hooks/web/usePage';

  import { tableTitle, schemas } from './config';

  import { permissionService } from '/@/api';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { checkAuthority } from '/@/utils/tools';

  export default defineComponent({
    setup() {
      const go = useGo();
      const { t } = useI18n();

      const [registerTable, { deleteItem, reload }] = useTable({
        id: 'roleList',
        title: '角色列表',
        api: permissionService.getRoleList,
        columns: tableTitle(delItem),
        useSearchForm: true,
        formConfig: {
          labelWidth: 100,
          schemas: schemas(),
        },
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
      });

      return () => (
        <PageWrapper>
          <BasicTable onRegister={registerTable}>
            {{
              toolbar: () => {
                return (
                  <a-button type="primary" onClick={getFormValues}>
                    <PlusCircleOutlined />
                    {t('common.addText')}
                  </a-button>
                );
              },
            }}
          </BasicTable>
        </PageWrapper>
      );
      function getFormValues() {
        checkAuthority('RoleAdd', () => {
          go('roleAdd');
        });
      }

      function delItem(item: any) {
        deleteItem(async () => {
          const data = await permissionService.roleDel({
            id: item.id,
          });
          return {
            success: data.code === ResultEnum.SUCCESS,
            reload,
          };
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>

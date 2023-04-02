<script lang="tsx">
  import { defineComponent, createVNode } from 'vue';
  import { Modal } from 'ant-design-vue';
  import {
    PlusCircleOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
  } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';

  import { tableTitle, schemas } from './config';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { permissionService } from '/@/api';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { checkAuthority } from '/@/utils/tools';

  export default defineComponent({
    setup() {
      const { t } = useI18n();

      const { createMessage } = useMessage();
      const go = useGo();
      const [registerTable, { deleteItem, reload, getSelectRows, clearSelectedRowKeys }] = useTable(
        {
          id: 'accountList',
          title: '账号列表',
          api: permissionService.getAccountList,
          columns: tableTitle(),
          useSearchForm: true,
          formConfig: {
            labelWidth: 100,
            schemas: schemas(),
          },
          showTableSetting: true,
          tableSetting: { fullScreen: true },
          showIndexColumn: false,
          rowSelection: { type: 'checkbox' },
        },
      );

      return () => (
        <PageWrapper>
          <BasicTable onRegister={registerTable}>
            {{
              toolbar: () => {
                return (
                  <div>
                    <a-button type="primary" onClick={getFormValues}>
                      <PlusCircleOutlined />
                      {t('common.addText')}
                    </a-button>
                    <a-button type="danger" onClick={delItem} style={{ marginLeft: '10px' }}>
                      <DeleteOutlined />
                      {t('common.delText')}
                    </a-button>
                  </div>
                );
              },
            }}
          </BasicTable>
        </PageWrapper>
      );

      function getFormValues() {
        checkAuthority('AccountAdd', () => {
          go('accountAdd');
        });
      }

      // function delItem(item: any) {
      //   deleteItem(async () => {
      //     const data = await permissionService.accountDel({
      //       id: item.id,
      //     });
      //     return {
      //       success: data.code === ResultEnum.SUCCESS,
      //       reload,
      //     };
      //   });
      // }
      function delItem() {
        checkAuthority('AccountDel', () => {
          const selectList = getSelectRows();
          if (!selectList.length) {
            return createMessage.error('请选择要删除的项');
          }
          Modal.confirm({
            content: '确定要删除选中项吗？',
            icon: createVNode(ExclamationCircleOutlined),
            onOk() {
              const id = selectList.map((item) => item.id).join(',');
              deleteItem(async () => {
                const { code } = await permissionService.accountDel({
                  id,
                });
                return {
                  success: code === ResultEnum.SUCCESS,
                  reload,
                  callBack: () => {
                    clearSelectedRowKeys();
                  },
                };
              });
            },
            onCancel() {
              Modal.destroyAll();
            },
          });
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>

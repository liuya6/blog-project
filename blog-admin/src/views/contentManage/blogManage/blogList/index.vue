<script lang="tsx">
  import { createVNode, defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';

  import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import DataChange from './dataChange/index.vue';

  import { schemas, tableTitle } from './config';
  import { contentService } from '/@/api';
  import { useModal } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { useMessage } from '/@/hooks/web/useMessage';

  // import { ResultEnum } from '/@/enums/httpEnum';

  export default defineComponent({
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();

      const isEdit = ref(false);
      const [registerDialog, { openModal }] = useModal();
      const getFormConfig = () => {
        return {
          labelWidth: 80,
          schemas: schemas(),
        };
      };

      const [registerTable, { reload, getSelectRows, deleteItem, clearSelectedRowKeys }] = useTable(
        {
          id: 'videoList',
          api: contentService.contentVideoList,
          columns: tableTitle(openModal, isEdit, changeStatus),
          useSearchForm: true,
          showIndexColumn: false,
          formConfig: getFormConfig(),
          showTableSetting: true,
          tableSetting: { fullScreen: true },
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
                    {
                      // <a-button
                      //   type="primary"
                      //   onClick={() => {
                      //     isEdit.value = false;
                      //     openModal();
                      //   }}
                      // >
                      //   <PlusCircleOutlined />
                      //   {t('common.addText')}
                      // </a-button>
                    }
                    <a-button type="danger" onClick={delItem} style={{ marginLeft: '10px' }}>
                      <DeleteOutlined />
                      {t('common.delText')}
                    </a-button>
                  </div>
                );
              },
            }}
          </BasicTable>
          <DataChange onRegister={registerDialog} isEdit={isEdit.value} reload={reload} />
        </PageWrapper>
      );

      function delItem() {
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
              const { code } = await contentService.contentVideoDel({
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
      }

      async function changeStatus(id: number, dostatus: number) {
        const data = await contentService.contentVideoChangeStatus({
          id,
          dostatus,
        });
        if (data.status) {
          createMessage.success('修改成功');
          reload();
        }
      }
    },
  });
</script>

<style scoped lang="less"></style>

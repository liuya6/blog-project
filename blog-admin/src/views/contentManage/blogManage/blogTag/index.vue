<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { PlusCircleOutlined } from '@ant-design/icons-vue';

  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable } from '/@/components/Table';
  import DataChange from './dataChange/index.vue';

  import { tableTitle } from './config';
  import { contentService } from '/@/api';
  import { useModal } from '/@/components/Modal';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ResultEnum } from '/@/enums/httpEnum';

  export default defineComponent({
    setup() {
      const { t } = useI18n();
      const isEdit = ref(false);
      const [registerDialog, { openModal }] = useModal();
      // const getFormConfig = () => {
      //   return {
      //     labelWidth: 80,
      //     schemas: schemas(),
      //   };
      // };

      const [registerTable, { reload, deleteItem }] = useTable({
        id: 'videoTypeList',
        api: contentService.contentVideoTypeList,
        columns: tableTitle(openModal, isEdit, delItem),
        // useSearchForm: true,
        // formConfig: getFormConfig(),
        showTableSetting: true,
        showIndexColumn: false,
        tableSetting: { fullScreen: true },
        // rowSelection: { type: 'checkbox' },
      });

      return () => (
        <PageWrapper>
          <BasicTable onRegister={registerTable}>
            {{
              toolbar: () => {
                return (
                  <div>
                    <a-button
                      type="primary"
                      onClick={() => {
                        isEdit.value = false;
                        openModal();
                      }}
                    >
                      <PlusCircleOutlined />
                      {t('common.addText')}
                    </a-button>
                    {
                      // <a-button type="danger" onClick={() => {}} style={{ marginLeft: '10px' }}>
                      //   <DeleteOutlined />
                      //   {t('common.delText')}
                      // </a-button>
                    }
                  </div>
                );
              },
            }}
          </BasicTable>
          <DataChange onRegister={registerDialog} isEdit={isEdit.value} reload={reload} />
        </PageWrapper>
      );

      function delItem(item: any) {
        deleteItem(async () => {
          const { code } = await contentService.contentVideoTypeDel({
            id: item.id,
          });
          return {
            success: code === ResultEnum.SUCCESS,
            reload,
          };
        });
      }
    },
  });
</script>

<style scoped lang="less"></style>

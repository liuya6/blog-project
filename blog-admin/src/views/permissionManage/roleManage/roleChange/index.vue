<script lang="tsx">
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';

  import { BasicForm, useForm } from '/@/components/Form';
  import { PageWrapper } from '/@/components/Page';
  import { CollapseContainer } from '/@/components/Container';
  import { schemas } from './config';

  import { permissionService } from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useSystemManageStoreWithOut } from '/@/store';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { useGo } from '/@/hooks/web/usePage';
  // import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    setup() {
      // const { createMessage } = useMessage();
      const go = useGo();
      const route = useRoute();
      const { createMessage } = useMessage();
      const systemManageStore = useSystemManageStoreWithOut();

      const isEdit = computed(() => {
        return route.name === 'RoleEdit';
      });

      const [register] = useForm({
        labelWidth: 150,
        showResetButton: false,
        submitButtonOptions: {
          text: isEdit.value ? '保存修改' : '确认提交',
          textAlign: 'right',
        },
        actionColOptions: {
          span: 10,
          offset: 6,
        },
      });

      return () => (
        <PageWrapper>
          <CollapseContainer title={isEdit.value ? '编辑角色' : '新增角色'}>
            <BasicForm onRegister={register} schemas={schemas()} onSubmit={handleSubmit} />
          </CollapseContainer>
        </PageWrapper>
      );

      async function handleSubmit(params: any) {
        try {
          let fn = permissionService.roleAdd;
          if (isEdit.value) {
            fn = permissionService.roleEdit;
            params.id = systemManageStore.editRole.id;
          }
          const data = await fn(params);
          if (data.code === ResultEnum.SUCCESS) {
            createMessage.success(isEdit.value ? '修改成功' : '创建成功');
            go('/permissionManage/roleManage');
          }
        } catch (e) {
          console.warn(e);
        }
      }
    },
  });
</script>

<style scoped lang="less">
  div {
    justify-content: center;
  }
</style>

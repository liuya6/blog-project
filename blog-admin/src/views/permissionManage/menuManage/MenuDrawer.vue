<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './config';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { permissionService } from '/@/api';
  import { parseTreeData } from '/@/utils/tools';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { ResultEnum } from '/@/enums/httpEnum';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const editData: any = ref({});
      const { t } = useI18n();
      const { createMessage } = useMessage();

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        editData.value = {};
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          editData.value = data.record;
          toSetFieldsVal(data.record);
        }
        const { data: routeData } = await permissionService.getMenuList();
        const treeData = parseTreeData(routeData, t);

        updateSchema({
          field: 'parent_id',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      function toSetFieldsVal(record) {
        const meta = record.meta ? record.meta : null;
        const hidden = meta && meta.hideMenu ? 2 : 1;
        const hideChildrenInMenu = meta && meta.hideChildrenInMenu ? 2 : 1;
        const result = {
          ...record,
          type: record.type,
          icon: meta ? meta.icon : null,
          hidden,
          hideChildrenInMenu,
        };
        setFieldsValue(result);
      }

      function parseParams(data: any) {
        const meta: {
          title: string;
          hideMenu?: boolean;
          hideChildrenInMenu?: boolean;
          icon?: string;
        } = {
          title: data.menu_name,
        };
        if (data.hidden === 2) {
          meta.hideMenu = true;
        }
        if (data.hideChildrenInMenu === 2) {
          meta.hideChildrenInMenu = true;
        }
        if (data.icon) {
          meta.icon = data.icon;
        }
        return {
          ...data,
          parent_id: data.parent_id ? data.parent_id : 0,
          meta: JSON.stringify(meta),
        };
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          const resultParams: any = parseParams(values);
          let fn = permissionService.menuAdd;
          if (isUpdate.value) {
            resultParams.id = editData.value.id;
            fn = permissionService.menuEdit;
          }
          setDrawerProps({ confirmLoading: true });
          const { code } = await fn(resultParams);
          if (code === ResultEnum.SUCCESS) {
            createMessage.success('操作成功');
            closeDrawer();
            emit('success');
          }
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
